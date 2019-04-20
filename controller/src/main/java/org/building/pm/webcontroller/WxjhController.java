package org.building.pm.webcontroller;

/*
 * 大修工程接口
 * */

import org.building.pm.webservice.WxjhService;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.stereotype.Controller;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.sql.SQLException;
import java.util.*;


@Controller
public class WxjhController implements BeanFactoryAware {

    private static WxjhService wxjhService;

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        wxjhService = (WxjhService) beanFactory.getBean("wxjhService");
    }

    public void WWQXCLJG(String xml) throws DocumentException, SQLException {
        try {
            Document doc = DocumentHelper.parseText(xml);

            Element rootElt = doc.getRootElement();
            Iterator iter = rootElt.elementIterator("items");
            while (iter.hasNext()) {
                Element recordEle = (Element) iter.next(); // 输出下一行

                Map M = new HashMap();

                Map ret = wxjhService.InsertWxProject(recordEle.elementTextTrim("V_SYSTEM"), recordEle.elementTextTrim("V_GUID"), recordEle.elementTextTrim("V_DEFECT_GUID"), recordEle.elementTextTrim("V_YEAR"),
                        recordEle.elementTextTrim("V_MONTH"), recordEle.elementTextTrim("V_ORGCODE"), recordEle.elementTextTrim("V_DEPTCODE"), recordEle.elementTextTrim("V_PROJECT_CODE"),
                        recordEle.elementTextTrim("V_PROJECT_NAME"), recordEle.elementTextTrim("V_WBS_CODE"), recordEle.elementTextTrim("V_WBS_NAME"), recordEle.elementTextTrim("V_CONTENT"), recordEle.elementTextTrim("V_BUDGET_MONEY"),
                        recordEle.elementTextTrim("V_BILL_CODE"), recordEle.elementTextTrim("V_PROJECT_STATUS"), recordEle.elementTextTrim("V_DEFECT_STATUS"), recordEle.elementTextTrim("V_REPAIR_DEPT"),
                        recordEle.elementTextTrim("V_REPAIR_DEPT_TXT"), recordEle.elementTextTrim("V_FZR"), recordEle.elementTextTrim("V_DATE_B"), recordEle.elementTextTrim("V_DATE_E"),
                        recordEle.elementTextTrim("V_INPER"), recordEle.elementTextTrim("V_INTIEM"), recordEle.elementTextTrim("V_PORJECT_GUID"));
            }
        } catch (Exception e) {
            wxjhService.WebServiceLog("","","失败","外委维修计划处理结果下传WebService失败，失败信息为"+e.getMessage());
            e.printStackTrace();
        }

    }

    public void WWQXBH(String xml) throws SQLException {
        try {
            Document doc = DocumentHelper.parseText(xml);

            Element rootElt = doc.getRootElement();
            Iterator iter = rootElt.elementIterator("items");
            while (iter.hasNext()) {
                Element recordEle = (Element) iter.next(); // 输出下一行

                Map M = new HashMap();

                Map ret = wxjhService.DefectBack(recordEle.elementTextTrim("V_DEFECT_GUID"), recordEle.elementTextTrim("V_BILL_CODE"), recordEle.elementTextTrim("V_DEFECT_TYPE"), recordEle.elementTextTrim("V_GUID"));


                wxjhService.WebServiceLog("",recordEle.elementTextTrim("V_DEFECT_GUID"),"成功","外委维修计划缺陷驳回WebService成功");
            }
        } catch (Exception e) {
            wxjhService.WebServiceLog("","","失败","外委维修计划缺陷驳回上传WebService失败，失败信息为"+e.getMessage());
            e.printStackTrace();
        }
    }

}


