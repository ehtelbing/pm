package org.building.pm.webcontroller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;

import javax.xml.namespace.QName;
import javax.xml.soap.*;
import javax.xml.ws.Dispatch;
import javax.xml.ws.Service;
import java.net.URL;

@Component
public class AMToMessController {
    public String AMToMess(String xele, String Url, String infopuburl, String infopubusername, String infopubpassword)

            throws Exception {


        String ns = "http://hoteamsoft.org/T";  // {1}
        String wsdlUrl = infopuburl;  // {2}
        String username = infopubusername;
        String password = infopubpassword;
        //1、创建服务(Service)
        URL url = new URL(wsdlUrl);
        QName sname = new QName(ns, "AMToMess"); // {3}
        Service service = Service.create(url, sname);

        //2、创建Dispatch
        Dispatch<SOAPMessage> dispatch = service.createDispatch(new QName(ns, "AMToMessSoap12"), SOAPMessage.class, Service.Mode.MESSAGE); // {4}

        //3、创建SOAPMessage
        SOAPMessage msg = MessageFactory.newInstance(SOAPConstants.SOAP_1_2_PROTOCOL).createMessage();
        SOAPEnvelope envelope = msg.getSOAPPart().getEnvelope();
        SOAPBody body = envelope.getBody();

        //3.2、处理header信息
        SOAPHeader header = envelope.getHeader();
        if (header == null) header = envelope.addHeader();




        QName hname = new QName(ns, "AMToMessIFCheck", "t");
        SOAPHeaderElement sheader = header.addHeaderElement(hname);
       sheader.addChildElement("UserName").setValue(username);
        sheader.addChildElement("PassWord").setValue(password);


        //4、创建QName来指定消息中传递数据
        QName ename = new QName(ns, "AMToMessIFCheck", "t");//<nn:add xmlns="xx"/>  // {5}
        SOAPBodyElement ele = body.addBodyElement(ename);
        // 传递参数
        ele.addChildElement("xele").setValue(xele);
        ele.addChildElement("url").setValue(Url);
        msg.writeTo(System.out);
        // System.out.println("\n invoking.....");

        //5、通过Dispatch传递消息,会返回响应消息
        SOAPMessage response = dispatch.invoke(msg);
        response.writeTo(System.out);
        //System.out.println();

        //6、响应消息处理,将响应的消息转换为dom对象
        Document doc = response.getSOAPPart().getEnvelope().getBody().extractContentAsDocument();
        String str = doc.getElementsByTagName("AMToMessIFCheckResult").item(0).getTextContent();  // {7}
        //System.out.println(str);


        return str;

    }
}
