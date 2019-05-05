package org.building.pm.webcontroller;

import org.activiti.engine.TaskService;
import org.building.pm.webservice.ActivitiWebService;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.stereotype.Controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ActivitiWebController implements BeanFactoryAware {

    private static ActivitiWebService activitiWebService;
    private static TaskService taskService;


    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        activitiWebService = (ActivitiWebService) beanFactory.getBean("activitiWebService");
        taskService = (TaskService) beanFactory.getBean("taskService");
    }


    /*
     * 通过人员号获取待办数量
     * */
    public String GetTaskDbNumByUserid(String userid) throws SQLException {
        String XML = "";
        String Usercode = "";
        int count = 0;
        String N_COUNT = "";
        HashMap result = activitiWebService.GetUserInfo(userid);
        List list = (List) result.get("list");

        Document root = DocumentHelper.createDocument();

        Element WriteDataRequest=root.addElement("items");
        for (int i = 0; i < list.size(); i++) {
            Map map = (Map) list.get(i);
            Usercode = map.get("V_PERSONCODE").toString();
        }

        count = (int) taskService.createTaskQuery().taskAssignee(Usercode).count();

        N_COUNT = String.valueOf(count);
        WriteDataRequest.addElement("V_USERCODE").setText(userid);
        WriteDataRequest.addElement("N_COUNT").setText(N_COUNT);
        return root.asXML();
    }
}
