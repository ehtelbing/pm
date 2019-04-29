
package org.building.pm.wclient.JXWCJG;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import java.util.ArrayList;
import java.util.List;


/**
 * 检修完成结果
 * 
 * <p>DT_JXWCJG complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="DT_JXWCJG">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="items" maxOccurs="unbounded">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="V_DEFECT_GUID">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_DEFECT_TYPE">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="20"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_SYSTEM">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="10"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_GUID">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_STR01">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_STR02">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_STR03">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_STR04">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="200"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_STR05">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="200"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DT_JXWCJG", propOrder = {
    "items"
})
public class DTJXWCJG {

    @XmlElement(required = true)
    protected List<Items> items;

    /**
     * Gets the value of the items property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the items property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getItems().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Items }
     * 
     * 
     */
    public List<Items> getItems() {
        if (items == null) {
            items = new ArrayList<Items>();
        }
        return this.items;
    }

    public void setItems(List<Items> items) {
        this.items = items;
    }

    /**
     * <p>anonymous complex type的 Java 类。
     * 
     * <p>以下模式片段指定包含在此类中的预期内容。
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element name="V_DEFECT_GUID">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_DEFECT_TYPE">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="20"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_SYSTEM">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="10"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_GUID">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_STR01">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_STR02">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_STR03">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_STR04">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="200"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_STR05">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="200"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "vdefectguid",
        "vdefecttype",
        "vsystem",
        "vguid",
        "vstr01",
        "vstr02",
        "vstr03",
        "vstr04",
        "vstr05"
    })
    public static class Items {

        @XmlElement(name = "V_DEFECT_GUID", required = true)
        protected String vdefectguid;
        @XmlElement(name = "V_DEFECT_TYPE", required = true)
        protected String vdefecttype;
        @XmlElement(name = "V_SYSTEM", required = true)
        protected String vsystem;
        @XmlElement(name = "V_GUID", required = true)
        protected String vguid;
        @XmlElement(name = "V_STR01", required = true)
        protected String vstr01;
        @XmlElement(name = "V_STR02", required = true)
        protected String vstr02;
        @XmlElement(name = "V_STR03", required = true)
        protected String vstr03;
        @XmlElement(name = "V_STR04", required = true)
        protected String vstr04;
        @XmlElement(name = "V_STR05", required = true)
        protected String vstr05;

        /**
         * 获取vdefectguid属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVDEFECTGUID() {
            return vdefectguid;
        }

        /**
         * 设置vdefectguid属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVDEFECTGUID(String value) {
            this.vdefectguid = value;
        }

        /**
         * 获取vdefecttype属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVDEFECTTYPE() {
            return vdefecttype;
        }

        /**
         * 设置vdefecttype属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVDEFECTTYPE(String value) {
            this.vdefecttype = value;
        }

        /**
         * 获取vsystem属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVSYSTEM() {
            return vsystem;
        }

        /**
         * 设置vsystem属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVSYSTEM(String value) {
            this.vsystem = value;
        }

        /**
         * 获取vguid属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVGUID() {
            return vguid;
        }

        /**
         * 设置vguid属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVGUID(String value) {
            this.vguid = value;
        }

        /**
         * 获取vstr01属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVSTR01() {
            return vstr01;
        }

        /**
         * 设置vstr01属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVSTR01(String value) {
            this.vstr01 = value;
        }

        /**
         * 获取vstr02属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVSTR02() {
            return vstr02;
        }

        /**
         * 设置vstr02属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVSTR02(String value) {
            this.vstr02 = value;
        }

        /**
         * 获取vstr03属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVSTR03() {
            return vstr03;
        }

        /**
         * 设置vstr03属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVSTR03(String value) {
            this.vstr03 = value;
        }

        /**
         * 获取vstr04属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVSTR04() {
            return vstr04;
        }

        /**
         * 设置vstr04属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVSTR04(String value) {
            this.vstr04 = value;
        }

        /**
         * 获取vstr05属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVSTR05() {
            return vstr05;
        }

        /**
         * 设置vstr05属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVSTR05(String value) {
            this.vstr05 = value;
        }

    }

}
