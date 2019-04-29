
package org.building.pm.wclient.JXWCJG;

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

    private final static QName _MTJXWCJG_QNAME = new QName("http://www.anshanmining.com/EAM_PM/", "MT_JXWCJG");
    private final static QName _MTJXWCJGRet_QNAME = new QName("http://www.anshanmining.com/EAM_PM/", "MT_JXWCJGRet");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.anshanmining.eam_pm
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link DTJXWCJG }
     * 
     */
    public DTJXWCJG createDTJXWCJG() {
        return new DTJXWCJG();
    }

    /**
     * Create an instance of {@link DTJXWCJGRet }
     * 
     */
    public DTJXWCJGRet createDTJXWCJGRet() {
        return new DTJXWCJGRet();
    }

    /**
     * Create an instance of {@link DTJXWCJG.Items }
     * 
     */
    public DTJXWCJG.Items createDTJXWCJGItems() {
        return new DTJXWCJG.Items();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DTJXWCJG }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.anshanmining.com/EAM_PM/", name = "MT_JXWCJG")
    public JAXBElement<DTJXWCJG> createMTJXWCJG(DTJXWCJG value) {
        return new JAXBElement<DTJXWCJG>(_MTJXWCJG_QNAME, DTJXWCJG.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DTJXWCJGRet }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.anshanmining.com/EAM_PM/", name = "MT_JXWCJGRet")
    public JAXBElement<DTJXWCJGRet> createMTJXWCJGRet(DTJXWCJGRet value) {
        return new JAXBElement<DTJXWCJGRet>(_MTJXWCJGRet_QNAME, DTJXWCJGRet.class, null, value);
    }

}
