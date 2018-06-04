package org.building.pm.webcontroller;


import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.apache.axis.encoding.XMLType;
import org.apache.axis.message.SOAPHeaderElement;
import org.building.pm.service.BasicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.xml.namespace.QName;
import javax.xml.rpc.ParameterMode;
import javax.xml.soap.SOAPException;

@Component
public class AMToMessController {


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
}
