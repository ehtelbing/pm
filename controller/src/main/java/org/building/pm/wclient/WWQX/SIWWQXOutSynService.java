
package org.building.pm.wclient.WWQX;

import javax.xml.namespace.QName;
import javax.xml.ws.*;
import java.net.MalformedURLException;
import java.net.URL;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2.9-b130926.1035
 * Generated source version: 2.2
 * 
 */
@WebServiceClient(name = "SI_WWQX_Out_SynService", targetNamespace = "http://www.anshanmining.com/EAM_PM/", wsdlLocation = "file:/E:/\u8bbe\u5907/\u63a5\u53e3/SI_WWQX_Out_Syn_PM0011.wsdl")
public class SIWWQXOutSynService
    extends Service
{

    private final static URL SIWWQXOUTSYNSERVICE_WSDL_LOCATION;
    private final static WebServiceException SIWWQXOUTSYNSERVICE_EXCEPTION;
    private final static QName SIWWQXOUTSYNSERVICE_QNAME = new QName("http://www.anshanmining.com/EAM_PM/", "SI_WWQX_Out_SynService");

    static {
        URL url = null;
        WebServiceException e = null;
        try {
            url = new URL("file:/E:/\u8bbe\u5907/\u63a5\u53e3/SI_WWQX_Out_Syn_PM0011.wsdl");
        } catch (MalformedURLException ex) {
            e = new WebServiceException(ex);
        }
        SIWWQXOUTSYNSERVICE_WSDL_LOCATION = url;
        SIWWQXOUTSYNSERVICE_EXCEPTION = e;
    }

    public SIWWQXOutSynService() {
        super(__getWsdlLocation(), SIWWQXOUTSYNSERVICE_QNAME);
    }

    public SIWWQXOutSynService(WebServiceFeature... features) {
        super(__getWsdlLocation(), SIWWQXOUTSYNSERVICE_QNAME, features);
    }

    public SIWWQXOutSynService(URL wsdlLocation) {
        super(wsdlLocation, SIWWQXOUTSYNSERVICE_QNAME);
    }

    public SIWWQXOutSynService(URL wsdlLocation, WebServiceFeature... features) {
        super(wsdlLocation, SIWWQXOUTSYNSERVICE_QNAME, features);
    }

    public SIWWQXOutSynService(URL wsdlLocation, QName serviceName) {
        super(wsdlLocation, serviceName);
    }

    public SIWWQXOutSynService(URL wsdlLocation, QName serviceName, WebServiceFeature... features) {
        super(wsdlLocation, serviceName, features);
    }

    /**
     * 
     * @return
     *     returns SIWWQXOutSyn
     */
    @WebEndpoint(name = "SI_WWQX_Out_SynPort")
    public SIWWQXOutSyn getSIWWQXOutSynPort() {
        return super.getPort(new QName("http://www.anshanmining.com/EAM_PM/", "SI_WWQX_Out_SynPort"), SIWWQXOutSyn.class);
    }

    /**
     * 
     * @param features
     *     A list of {@link WebServiceFeature} to configure on the proxy.  Supported features not in the <code>features</code> parameter will have their default values.
     * @return
     *     returns SIWWQXOutSyn
     */
    @WebEndpoint(name = "SI_WWQX_Out_SynPort")
    public SIWWQXOutSyn getSIWWQXOutSynPort(WebServiceFeature... features) {
        return super.getPort(new QName("http://www.anshanmining.com/EAM_PM/", "SI_WWQX_Out_SynPort"), SIWWQXOutSyn.class, features);
    }

    private static URL __getWsdlLocation() {
        if (SIWWQXOUTSYNSERVICE_EXCEPTION!= null) {
            throw SIWWQXOUTSYNSERVICE_EXCEPTION;
        }
        return SIWWQXOUTSYNSERVICE_WSDL_LOCATION;
    }

}