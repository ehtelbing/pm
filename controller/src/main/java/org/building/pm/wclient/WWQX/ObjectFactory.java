
package org.building.pm.wclient.WWQX;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.anshanmining.eam_pm package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _MTWWQXRet_QNAME = new QName("http://www.anshanmining.com/EAM_PM/", "MT_WWQXRet");
    private final static QName _MTWWQX_QNAME = new QName("http://www.anshanmining.com/EAM_PM/", "MT_WWQX");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.anshanmining.eam_pm
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link DTWWQX }
     * 
     */
    public DTWWQX createDTWWQX() {
        return new DTWWQX();
    }

    /**
     * Create an instance of {@link DTWWQXRet }
     * 
     */
    public DTWWQXRet createDTWWQXRet() {
        return new DTWWQXRet();
    }

    /**
     * Create an instance of {@link DTWWQX.Items }
     * 
     */
    public DTWWQX.Items createDTWWQXItems() {
        return new DTWWQX.Items();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DTWWQXRet }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.anshanmining.com/EAM_PM/", name = "MT_WWQXRet")
    public JAXBElement<DTWWQXRet> createMTWWQXRet(DTWWQXRet value) {
        return new JAXBElement<DTWWQXRet>(_MTWWQXRet_QNAME, DTWWQXRet.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DTWWQX }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.anshanmining.com/EAM_PM/", name = "MT_WWQX")
    public JAXBElement<DTWWQX> createMTWWQX(DTWWQX value) {
        return new JAXBElement<DTWWQX>(_MTWWQX_QNAME, DTWWQX.class, null, value);
    }

}
