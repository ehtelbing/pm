
package org.building.pm.wclient.WWQX;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import java.util.ArrayList;
import java.util.List;


/**
 * 委外缺陷信息
 * 
 * <p>DT_WWQX complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="DT_WWQX">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="items" maxOccurs="unbounded">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="V_SYSTEM">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="10"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_YEAR">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="20"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_MONTH">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="20"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_ORGCODE">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="20"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_DEPTCODE">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="20"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_BILL_CODE">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_BILL_ADD">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="200"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_SPECIALTY">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_JHLB">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_SCLB">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_CPZL">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_DEFECTGUID">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_DEFECTLIST">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="500"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_DEFECT_SOL">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="500"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_EQU_NAME">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_EUQ_CODE">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_EQU_MAIN">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_EQU_MAIN_CODE">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_DEFECTDATE">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_DEFECTPERCODE">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="50"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_FILES">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="200"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="V_MEMO">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="500"/>
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
@XmlType(name = "DT_WWQX", propOrder = {
    "items"
})
public class DTWWQX {

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
     *         &lt;element name="V_SYSTEM">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="10"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_YEAR">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="20"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_MONTH">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="20"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_ORGCODE">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="20"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_DEPTCODE">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="20"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_BILL_CODE">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_BILL_ADD">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="200"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_SPECIALTY">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_JHLB">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_SCLB">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_CPZL">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_DEFECTGUID">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_DEFECTLIST">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="500"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_DEFECT_SOL">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="500"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_EQU_NAME">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_EUQ_CODE">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_EQU_MAIN">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_EQU_MAIN_CODE">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_DEFECTDATE">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_DEFECTPERCODE">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="50"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_FILES">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="200"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="V_MEMO">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="500"/>
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
        "vsystem",
        "vyear",
        "vmonth",
        "vorgcode",
        "vdeptcode",
        "vbillcode",
        "vbilladd",
        "vspecialty",
        "vjhlb",
        "vsclb",
        "vcpzl",
        "vdefectguid",
        "vdefectlist",
        "vdefectsol",
        "vequname",
        "veuqcode",
        "vequmain",
        "vequmaincode",
        "vdefectdate",
        "vdefectpercode",
        "vfiles",
        "vmemo",
        "vstr01",
        "vstr02",
        "vstr03",
        "vstr04",
        "vstr05"
    })
    public static class Items {

        @XmlElement(name = "V_SYSTEM", required = true)
        protected String vsystem;
        @XmlElement(name = "V_YEAR", required = true)
        protected String vyear;
        @XmlElement(name = "V_MONTH", required = true)
        protected String vmonth;
        @XmlElement(name = "V_ORGCODE", required = true)
        protected String vorgcode;
        @XmlElement(name = "V_DEPTCODE", required = true)
        protected String vdeptcode;
        @XmlElement(name = "V_BILL_CODE", required = true)
        protected String vbillcode;
        @XmlElement(name = "V_BILL_ADD", required = true)
        protected String vbilladd;
        @XmlElement(name = "V_SPECIALTY", required = true)
        protected String vspecialty;
        @XmlElement(name = "V_JHLB", required = true)
        protected String vjhlb;
        @XmlElement(name = "V_SCLB", required = true)
        protected String vsclb;
        @XmlElement(name = "V_CPZL", required = true)
        protected String vcpzl;
        @XmlElement(name = "V_DEFECTGUID", required = true)
        protected String vdefectguid;
        @XmlElement(name = "V_DEFECTLIST", required = true)
        protected String vdefectlist;
        @XmlElement(name = "V_DEFECT_SOL", required = true)
        protected String vdefectsol;
        @XmlElement(name = "V_EQU_NAME", required = true)
        protected String vequname;
        @XmlElement(name = "V_EUQ_CODE", required = true)
        protected String veuqcode;
        @XmlElement(name = "V_EQU_MAIN", required = true)
        protected String vequmain;
        @XmlElement(name = "V_EQU_MAIN_CODE", required = true)
        protected String vequmaincode;
        @XmlElement(name = "V_DEFECTDATE", required = true)
        protected String vdefectdate;
        @XmlElement(name = "V_DEFECTPERCODE", required = true)
        protected String vdefectpercode;
        @XmlElement(name = "V_FILES", required = true)
        protected String vfiles;
        @XmlElement(name = "V_MEMO", required = true)
        protected String vmemo;
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
         * 获取vyear属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVYEAR() {
            return vyear;
        }

        /**
         * 设置vyear属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVYEAR(String value) {
            this.vyear = value;
        }

        /**
         * 获取vmonth属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVMONTH() {
            return vmonth;
        }

        /**
         * 设置vmonth属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVMONTH(String value) {
            this.vmonth = value;
        }

        /**
         * 获取vorgcode属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVORGCODE() {
            return vorgcode;
        }

        /**
         * 设置vorgcode属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVORGCODE(String value) {
            this.vorgcode = value;
        }

        /**
         * 获取vdeptcode属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVDEPTCODE() {
            return vdeptcode;
        }

        /**
         * 设置vdeptcode属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVDEPTCODE(String value) {
            this.vdeptcode = value;
        }

        /**
         * 获取vbillcode属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVBILLCODE() {
            return vbillcode;
        }

        /**
         * 设置vbillcode属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVBILLCODE(String value) {
            this.vbillcode = value;
        }

        /**
         * 获取vbilladd属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVBILLADD() {
            return vbilladd;
        }

        /**
         * 设置vbilladd属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVBILLADD(String value) {
            this.vbilladd = value;
        }

        /**
         * 获取vspecialty属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVSPECIALTY() {
            return vspecialty;
        }

        /**
         * 设置vspecialty属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVSPECIALTY(String value) {
            this.vspecialty = value;
        }

        /**
         * 获取vjhlb属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVJHLB() {
            return vjhlb;
        }

        /**
         * 设置vjhlb属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVJHLB(String value) {
            this.vjhlb = value;
        }

        /**
         * 获取vsclb属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVSCLB() {
            return vsclb;
        }

        /**
         * 设置vsclb属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVSCLB(String value) {
            this.vsclb = value;
        }

        /**
         * 获取vcpzl属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVCPZL() {
            return vcpzl;
        }

        /**
         * 设置vcpzl属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVCPZL(String value) {
            this.vcpzl = value;
        }

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
         * 获取vdefectlist属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVDEFECTLIST() {
            return vdefectlist;
        }

        /**
         * 设置vdefectlist属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVDEFECTLIST(String value) {
            this.vdefectlist = value;
        }

        /**
         * 获取vdefectsol属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVDEFECTSOL() {
            return vdefectsol;
        }

        /**
         * 设置vdefectsol属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVDEFECTSOL(String value) {
            this.vdefectsol = value;
        }

        /**
         * 获取vequname属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVEQUNAME() {
            return vequname;
        }

        /**
         * 设置vequname属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVEQUNAME(String value) {
            this.vequname = value;
        }

        /**
         * 获取veuqcode属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVEUQCODE() {
            return veuqcode;
        }

        /**
         * 设置veuqcode属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVEUQCODE(String value) {
            this.veuqcode = value;
        }

        /**
         * 获取vequmain属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVEQUMAIN() {
            return vequmain;
        }

        /**
         * 设置vequmain属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVEQUMAIN(String value) {
            this.vequmain = value;
        }

        /**
         * 获取vequmaincode属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVEQUMAINCODE() {
            return vequmaincode;
        }

        /**
         * 设置vequmaincode属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVEQUMAINCODE(String value) {
            this.vequmaincode = value;
        }

        /**
         * 获取vdefectdate属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVDEFECTDATE() {
            return vdefectdate;
        }

        /**
         * 设置vdefectdate属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVDEFECTDATE(String value) {
            this.vdefectdate = value;
        }

        /**
         * 获取vdefectpercode属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVDEFECTPERCODE() {
            return vdefectpercode;
        }

        /**
         * 设置vdefectpercode属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVDEFECTPERCODE(String value) {
            this.vdefectpercode = value;
        }

        /**
         * 获取vfiles属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVFILES() {
            return vfiles;
        }

        /**
         * 设置vfiles属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVFILES(String value) {
            this.vfiles = value;
        }

        /**
         * 获取vmemo属性的值。
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVMEMO() {
            return vmemo;
        }

        /**
         * 设置vmemo属性的值。
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVMEMO(String value) {
            this.vmemo = value;
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
