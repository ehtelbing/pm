package org.building.pm.webcontroller;


import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.apache.axis.encoding.XMLType;
import org.apache.axis.message.SOAPHeaderElement;
import org.building.pm.service.BasicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.xml.namespace.QName;
import javax.xml.rpc.ParameterMode;
import javax.xml.soap.SOAPException;

@Component
public class AMToMessController {

    @Autowired
    private BasicService basicService;

    @Value("#{configProperties['infopub.url']}")
    private String infopuburl;

    @Value("#{configProperties['infopub.username']}")
    private String infopubusername;

    @Value("#{configProperties['infopub.password']}")
    private String infopubpassword;

    @Value("#{configProperties['pmlogin']}")
    private String pmlogin;


    public String AMToMess(String xele, String Url, String infopuburl, String infopubusername, String infopubpassword) throws Exception {

        try {
            Service service = new Service();
            Call call = (Call) service.createCall();
            call.setTargetEndpointAddress(new java.net.URL(infopuburl));
            call.setSOAPActionURI("http://hoteamsoft.org/AMToMessIFCheck");
            call.setOperationName(new QName("http://hoteamsoft.org/T", "AMToMessIFCheck"));
            call.addParameter("xele", XMLType.XSD_STRING, ParameterMode.IN);
            call.addParameter("url", XMLType.XSD_STRING, ParameterMode.IN);

            SOAPHeaderElement soapHeaderElement = new SOAPHeaderElement(
                    "http://hoteamsoft.org/T", "MySoapHeader");
            soapHeaderElement.setNamespaceURI("http://hoteamsoft.org/T");
            try {
                soapHeaderElement.addChildElement("UserName").setValue(infopubusername); //业务系统用户名
                soapHeaderElement.addChildElement("PassWord").setValue(infopubpassword); //业务系统密码
            } catch (SOAPException e) {
                e.printStackTrace();
            }
            call.addHeader(soapHeaderElement);

            call.setReturnType(XMLType.XSD_STRING);

            String ret = (String) call.invoke(new Object[]{xele, Url});//xele为主体发送参数（详见“业务系统发送信息服务模板参数说明”）;url为推送到终端并能访问业务系统的链接地址。
            return ret;
        } catch (Exception e) {
            e.printStackTrace();
            return "Fail";
        }
    }

    public String MessageSend(String dbnum, String flowType, String nexPer) throws Exception {

        String jstcode = basicService.BASE_PRO_JST_CODESEL(nexPer);
        String result = "";
        if (jstcode.equals("")) {
            result = "noperson";
        } else {
            String messtxt = "PM系统待办提醒";
            String MSG = "<SendMessage><AM_Name>" + jstcode + "</AM_Name><PhoneNum></PhoneNum><UserId></UserId><MessageTxt>" + messtxt + "</MessageTxt><SystemName>设备管理系统</SystemName><Type>即时通</Type><Access></Access><Email></Email><IsBack></IsBack><IsEncrypt></IsEncrypt><ISPriority></ISPriority><Ohter1></Ohter1><Ohter2></Ohter2></SendMessage>";
            String loginurl = pmlogin + "?v_mancode=" + nexPer + "&v_type=newangel";

            String strContent = "<HTML><BODY bgColor='#ffffff' style='font-family:Verdana,新宋体;font-size: 12px;'>";
            strContent += "<HR size='1' style='color: 52658C;'>";
            strContent += "待办任务提醒：<UL>";
            strContent += "<li>您有：" + dbnum + " 条" + flowType + "待办</li>";
            strContent += "</UL><a href='" + loginurl + "' target='_blank' >请点击这里进行办理</a></BODY></HTML>";


            try {
                result = AMToMess(MSG, strContent, infopuburl, infopubusername, infopubpassword);
            } catch (Exception e) {
                e.printStackTrace();
                result = "fail";
            }
        }
        return result;
    }
}
