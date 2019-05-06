package org.building.pm.webcontroller;

import org.activiti.engine.TaskService;
import org.building.pm.webservice.ActivitiWebService;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.stereotype.Controller;

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
    public String DBSL(String V_USERCODE) {
        String XML = "";
        String Usercode = "";
        int count = 0;
        try {
            HashMap result = activitiWebService.GetUserInfo(V_USERCODE);
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                Usercode = map.get("V_PERSONCODE").toString();
            }

            count = (int) taskService.createTaskQuery().taskAssignee(Usercode).count();

            XML = "<DBSL><V_USERCODE>" + V_USERCODE + "</V_USERCODE><V_SYSTEM>AKSB</V_SYSTEM><N_COUNT>" + count + "</N_COUNT><V_URL>http:10.101.2.45:8080/pm/app/pm/page/PM_2103/index.html</V_URL></DBSL>";


        } catch (Exception e) {
            e.printStackTrace();
        }
        return XML;
    }
}
