package org.building.pm.webcontroller;


import org.apache.ibatis.jdbc.SQL;
import org.building.pm.webservice.WxjhService;
import org.codehaus.xfire.client.Client;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.InetAddress;
import java.net.URL;
import java.net.UnknownHostException;
import java.sql.SQLException;
import java.util.*;

@Controller
@RequestMapping("/app/pm/wxjh")
public class WxjhController {

    @Autowired
    private WxjhService wxjhService;

    @Value("#{configProperties['DefectPicUrl']}")
    private String DefectPicUrl;

    @Value("#{configProperties['ninfopub.username']}")
    private String ninfopubusername;

    @Value("#{configProperties['piusername']}")
    private String piusername;

    @Value("#{configProperties['pipassword']}")
    private String pipassword;

    @Value("#{configProperties['PM0011.retunUrl']}")
    private String Pm0011Url;

    @Value("#{configProperties['PM0014.retunUrl']}")
    private String Pm0014Url;

    @Value("#{configProperties['PM0010.retunUrl']}")
    private String Pm0010Url;

    @Value("#{configProperties['PR1003.returnUrl']}")
    private String PR1003;

    @Value("#{configProperties['PM1001.returnUrl']}")
    private String PM1001;

    @Value("#{configProperties['pmservice.url']}")
    private String serviceUrl;

    @Value("#{configProperties['ProjectUrl']}")
    private String ProjectUrl;



    @Value("#{configProperties['pmurl']}")
    private String pmurl;


    /*
     * 检修完成结果下传
     * */
    @RequestMapping(value = "SI_JXWCJG_Out_Syn_PM0014", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SI_JXWCJG_Out_Syn_PM0014(@RequestParam(value = "V_V_WORKORDER") String V_V_WORKORDER,
                                                        @RequestParam(value="V_V_DEFECT_TYPE") String V_V_DEFECT_TYPE) throws SQLException {
        Map mapEle = new HashMap();

        try {
            String path = this.getClass().getClassLoader().getResource("").getPath().toString() + "fwsdl/SI_JXWCJG_Out_Syn_PM0014.wsdl";
            Document root = DocumentHelper.createDocument();
            Element WriteDataRequest = root.addElement("Items");

            WriteDataRequest.addElement("V_V_WORKORDER").setText(V_V_WORKORDER);
            WriteDataRequest.addElement("V_V_DEFECT_TYPE").setText(V_V_DEFECT_TYPE);
            WriteDataRequest.addElement("V_SYSTEM").setText(ninfopubusername);
            WriteDataRequest.addElement("WsdlUrl").setText(path);
            WriteDataRequest.addElement("piusername").setText(piusername);
            WriteDataRequest.addElement("pipassword").setText(pipassword);
            WriteDataRequest.addElement("Pm0014Url").setText(Pm0014Url);

            Client client = new Client(new URL(serviceUrl + "/pmService?WSDL"));
            System.out.println(root.asXML());
            Object[] results = client.invoke("PM0014", new Object[]{root.asXML()});

            Document doc = DocumentHelper.parseText(results[0].toString());
            Element rootElt = doc.getRootElement();
            List<Element> childElements = rootElt.elements();

            mapEle = getAllElements(childElements, mapEle);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return mapEle;
    }

    /*
     * 委外缺陷信息下传
     * */
    @RequestMapping(value = "SI_WWQX_Out_Syn_PM0011", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SI_WWQX_Out_Syn_PM0011(@RequestParam(value = "PROJECT_GUID_DATA") String[] PROJECT_GUID_DATA) throws SQLException {

        Map<String, Object> mapEle = new HashMap<String, Object>();
        String V_V_PROJECT_GUID = "";
        for (int i = 0; i < PROJECT_GUID_DATA.length; i++) {
            if (i == 0) {
                V_V_PROJECT_GUID = PROJECT_GUID_DATA[i];
            } else {
                V_V_PROJECT_GUID = V_V_PROJECT_GUID + "," + PROJECT_GUID_DATA[i];
            }
        }

        try {
            String path = this.getClass().getClassLoader().getResource("").getPath().toString() + "fwsdl/SI_WWQX_Out_Syn_PM0011.wsdl";
            Document root = DocumentHelper.createDocument();
            Element WriteDataRequest = root.addElement("Items");
            WriteDataRequest.addElement("XML").setText(V_V_PROJECT_GUID);
            WriteDataRequest.addElement("Url").setText(DefectPicUrl);
            WriteDataRequest.addElement("ProjectUrl").setText(ProjectUrl);
            WriteDataRequest.addElement("WsdlUrl").setText(path);
            WriteDataRequest.addElement("piusername").setText(piusername);
            WriteDataRequest.addElement("pipassword").setText(pipassword);
            WriteDataRequest.addElement("Pm0011Url").setText(Pm0011Url);

            Client client = new Client(new URL(serviceUrl + "/pmService?WSDL"));
            System.out.println(root.asXML());
            Object[] results = client.invoke("PM0011", new Object[]{root.asXML()});

            Document doc = DocumentHelper.parseText(results[0].toString());
            Element rootElt = doc.getRootElement();
            List<Element> childElements = rootElt.elements();

            mapEle = getAllElements(childElements, mapEle);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return mapEle;

    }

    /*
     * 点检缺陷处理结果
     * */
    @RequestMapping(value = "SI_DJQXCLJG_Out_Syn_PM0010", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SI_DJQXCLJG_Out_Syn_PM0010(@RequestParam(value = "V_V_DEFECTGUID") String V_V_DEFECTGUID) throws SQLException {

        Map<String, Object> mapEle = new HashMap<String, Object>();
        try {
            String path = this.getClass().getClassLoader().getResource("").getPath().toString() + "fwsdl/SI_DJQXCLJG_Out_Syn_PM0010.wsdl";
            Document root = DocumentHelper.createDocument();
            Element WriteDataRequest = root.addElement("Items");
            WriteDataRequest.addElement("GUID").setText(V_V_DEFECTGUID);
            WriteDataRequest.addElement("WsdlUrl").setText(path);
            WriteDataRequest.addElement("piusername").setText(piusername);
            WriteDataRequest.addElement("pipassword").setText(pipassword);
            WriteDataRequest.addElement("Pm0010Url").setText(Pm0010Url);

            Client client = new Client(new URL(serviceUrl + "/pmService?WSDL"));
            System.out.println(root.asXML());
            Object[] results = client.invoke("PM0010", new Object[]{root.asXML()});

            Document doc = DocumentHelper.parseText(results[0].toString());
            Element rootElt = doc.getRootElement();
            List<Element> childElements = rootElt.elements();

            mapEle = getAllElements(childElements, mapEle);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return mapEle;

    }

    //PMPERPOW
    @RequestMapping(value = "SI_RYQX_Out_Syn_PR1003", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SI_RYQX_Out_Syn_PR1003(@RequestParam(value = "ROLECODE") String ROLECODE,
                                                      @RequestParam(value = "ORG") String ORG,
                                                      HttpServletResponse response,
                                                      HttpServletRequest request)
            throws SQLException, UnknownHostException {
        Map<String, Object> mapEle = new HashMap<>();
        String hostAddress = request.getServerName();
        String port = "" + request.getServerPort();
        try {
            String path = this.getClass().getClassLoader().getResource("").getPath().toString() + "fwsdl/SI_RYQX_Out_Syn_PR1003.wsdl";
            Document root = DocumentHelper.createDocument();
            Element WriteDataRequest = root.addElement("Items");
            WriteDataRequest.addElement("ROLECODE").setText(ROLECODE);
            WriteDataRequest.addElement("ORG").setText(ORG);
            WriteDataRequest.addElement("SYSTEM").setText(ninfopubusername);
            WriteDataRequest.addElement("V_IP").setText(hostAddress);
            WriteDataRequest.addElement("V_PORT").setText(port);
            WriteDataRequest.addElement("V_URL").setText(pmurl);
            WriteDataRequest.addElement("WsdlUrl").setText(path);
            WriteDataRequest.addElement("piusername").setText(piusername);
            WriteDataRequest.addElement("pipassword").setText(pipassword);
            WriteDataRequest.addElement("PR1003Url").setText(PR1003);

            Client client = new Client(new URL(serviceUrl + "/pmService?WSDL"));
            System.out.println(root.asXML());
            Object[] results = client.invoke("PR1003", new Object[]{root.asXML()});

            Document doc = DocumentHelper.parseText(results[0].toString());
            Element rootElt = doc.getRootElement();
            List<Element> childElements = rootElt.elements();

            mapEle = getAllElements(childElements, mapEle);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return mapEle;
    }


    /*
     *人员对应菜单权限
     * */


    /*
     * Sap工单上传
     * */
    @RequestMapping(value = "SI_SpotChkProj_in", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SI_SpotChkProj_in(@RequestParam(value = "V_V_ORDERID") String V_V_ORDERID) throws SQLException {

        Map<String, Object> mapEle = new HashMap<String, Object>();
        try {
            String path = this.getClass().getClassLoader().getResource("").getPath().toString() + "fwsdl/SI_SpotChkProj_in.wsdl";
            Document root = DocumentHelper.createDocument();
            Element WriteDataRequest = root.addElement("Items");
            WriteDataRequest.addElement("ORDERGUID").setText(V_V_ORDERID);
            WriteDataRequest.addElement("WsdlUrl").setText(path);
            WriteDataRequest.addElement("piusername").setText(piusername);
            WriteDataRequest.addElement("pipassword").setText(pipassword);
            WriteDataRequest.addElement("Pm1001Url").setText(PM1001);

            Client client = new Client(new URL(serviceUrl + "/pmService?WSDL"));
            System.out.println(root.asXML());
            Object[] results = client.invoke("PM1001", new Object[]{root.asXML()});

            Document doc = DocumentHelper.parseText(results[0].toString());
            Element rootElt = doc.getRootElement();
            List<Element> childElements = rootElt.elements();

            mapEle = getAllElements(childElements, mapEle);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return mapEle;

    }


    private Map<String, Object> getAllElements(List<Element> childElements, Map<String, Object> mapEle) {
        for (Element ele : childElements) {
            mapEle.put(ele.getName(), ele.getText());
            if (ele.elements().size() > 0) {
                mapEle = getAllElements(ele.elements(), mapEle);
            }
        }
        return mapEle;
    }


}
