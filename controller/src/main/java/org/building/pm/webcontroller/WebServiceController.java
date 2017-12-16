package org.building.pm.webcontroller;

import org.building.pm.service.ZdhService;
import org.building.pm.webservice.MMService;
import org.building.pm.webservice.WebServiceService;
import org.codehaus.xfire.client.Client;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by zjh on 2017/6/20.
 */
@Controller
public class WebServiceController implements BeanFactoryAware {

    private static WebServiceService webServiceService;


    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        webServiceService = (WebServiceService) beanFactory.getBean("webServiceService");
    }

    public String repariOldStart(String V_V_ORGSAP,String V_V_DEPTSAP,String V_V_MMCODE,
                                 String V_V_MMNAME,String V_V_NUM,String V_V_REMARK,String V_V_PERCODE) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        System.out.println("调用成功");
        HashMap data = webServiceService.PM_WORKORDER_OLD_CREATE(V_V_ORGSAP, V_V_DEPTSAP, V_V_MMCODE, V_V_MMNAME, V_V_NUM,V_V_REMARK,V_V_PERCODE);
        String ret =  (String)data.get("RET");
        return ret;
    }



}
