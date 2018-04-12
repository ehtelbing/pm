package org.building.pm.webcontroller;

import org.building.pm.service.ZdhService;
import org.building.pm.webservice.MMService;
import org.codehaus.xfire.client.Client;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
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
@RequestMapping("/app/pm/mm")
public class MMController {
    @Autowired
    private MMService webPCService;
    @Autowired
    private ZdhService zdhService;

    @Value("#{configProperties['MMEqu.url']}")
    private String MMEquurl;

    @Value("#{configProperties['MMXl.url']}")
    private String MMXlurl;

    @Value("#{configProperties['MMSap.url']}")
    private String MMSapurl;

    /*
        * 物料实际数量
        * */
    @RequestMapping(value = "GetBillMaterialByOrder", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GetBillMaterialByOrder(@RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
                                                      @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                      @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE)
            throws SQLException {
        Map result = new HashMap();
        try {
         //   Client client = new Client(new URL("http://10.101.2.22/MaterialManage/WebService_SB/WS_EquipService.asmx?WSDL"));
            Client client = new Client(new URL(MMEquurl));

            Object[] results = client.invoke("getBillMaterialByOrder", new Object[]{V_V_ORDERID});

            Document doc = DocumentHelper.parseText(results[0].toString());

            Element rootElt = doc.getRootElement();
            Iterator iter = rootElt.elementIterator("Bill");
            List<Map> list = new ArrayList<Map>();

            while (iter.hasNext()) {
                Element recordEle = (Element) iter.next();

                String billcode = recordEle.elementTextTrim("billcode");
                String vch_sparepart_code = recordEle.elementTextTrim("vch_sparepart_code");
                String vch_sparepart_name = recordEle.elementTextTrim("vch_sparepart_name");

                String vch_type = recordEle.elementTextTrim("vch_type");

                String vch_unit = recordEle.elementTextTrim("vch_unit");
                String price = recordEle.elementTextTrim("price");
                String f_number = recordEle.elementTextTrim("f_number");
                String BillType = recordEle.elementTextTrim("BillType");
                String setret = webPCService.PRO_PM_WORKORDER_SPARE_MM_SET(V_V_ORDERGUID, V_V_ORDERID, billcode, vch_sparepart_code, vch_sparepart_name, vch_type,
                        vch_unit, price, f_number, BillType);
            }

            String ret = webPCService.PRO_PM_WORKORDER_SPARE_UPDATE(V_V_ORDERGUID);

            String V_V_log = "服务日志־"+MMEquurl;


            Date currentTime = new Date();
            SimpleDateFormat Format = new SimpleDateFormat("yyyy-MM-dd");
            String titleNameTime = Format.format(currentTime);
            webPCService.PRO_LOG_WEB_SET(V_V_log, null, titleNameTime, "WS_Equip", V_V_PERCODE);
            result.put("ret", "Success");
        } catch (MalformedURLException e) {
            result.put("ret", "Fail");
            e.printStackTrace();
        } catch (Exception e) {
            result.put("ret", "Fail");
            e.printStackTrace();
        }
        return result;
    }

    /*
 * 获取当前作业区物资库房
 * */
    @RequestMapping(value = "GetStoreList", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GetStoreList(@RequestParam(value = "SAP_PLANTCODE") String SAP_PLANTCODE,
                                            @RequestParam(value = "SAP_DEPARTCODE") String SAP_DEPARTCODE,
                                            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE) throws SQLException {
        Map result = new HashMap();
        try {
            Client client = new Client(new URL(MMEquurl));

            Object[] results = client.invoke("getStoreList", new Object[]{SAP_PLANTCODE, SAP_DEPARTCODE});

            Document doc = DocumentHelper.parseText(results[0].toString());

            Element rootElt = doc.getRootElement();
            Iterator iter = rootElt.elementIterator("item");
            List<Map> list = new ArrayList<Map>();

            while (iter.hasNext()) {
                Element recordEle = (Element) iter.next();

                Map m = new HashMap();

                String store_id = recordEle.elementTextTrim("store_id");
                String store_desc = recordEle.elementTextTrim("store_desc");

                m.put("store_id", store_id);
                m.put("store_desc", store_desc);
                list.add(m);
            }
            String V_V_log = "服务日志־"+MMEquurl;

            Date currentTime = new Date();
            SimpleDateFormat Format = new SimpleDateFormat("yyyy-MM-dd");
            String titleNameTime = Format.format(currentTime);
            webPCService.PRO_LOG_WEB_SET(V_V_log, null, titleNameTime, "WS_Equip", V_V_PERCODE);
            result.put("ret", "Success");
            result.put("list", list);

        } catch (MalformedURLException e) {
            result.put("ret", "Fail");
            e.printStackTrace();
        } catch (Exception e) {
            result.put("ret", "Fail");
            e.printStackTrace();
        }
        return result;
    }

    /*
    *物资库房接口
    * */
    @RequestMapping(value = "/GetDepartKC_storeid", method = RequestMethod.POST)
    @ResponseBody
    public Map GetDepartKC_storeid(@RequestParam(value = "number") Integer number,
                                   @RequestParam(value = "code") String code,
                                   @RequestParam(value = "name") String name,
                                   @RequestParam(value = "sap_plantcode") String sap_plantcode,
                                   @RequestParam(value = "sap_departcode") String sap_departcode,
                                   @RequestParam(value = "storeplace") String storeplace,
                                   @RequestParam(value = "i_from_id") String i_from_id,
                                   @RequestParam(value = "x_personcode") String x_personcode,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map test = new HashMap();
        List<Map> result = null;
        try {
            Client client = new Client(new URL(MMEquurl));

            Object[] results = client.invoke("GetDepartKC_storeid",
                    new Object[]{number, code, name, sap_plantcode,
                            sap_departcode, storeplace,i_from_id});


            Document doc = DocumentHelper.parseText(results[0].toString());

            Element rootElt = doc.getRootElement(); // 获取根节点
            Iterator iter = rootElt.elementIterator("item"); // 获取二级节点
            List<Map> list = new ArrayList<Map>();

            while (iter.hasNext()) {

                Element recordEle = (Element) iter.next(); // 输出下一行

                Map M = new HashMap();

                M.put("VCH_SPAREPART_CODE",
                        recordEle.elementTextTrim("vch_sparepart_code"));
                M.put("VCH_SPAREPART_NAME",
                        recordEle.elementTextTrim("vch_sparepart_name"));
                M.put("VCH_TYPE", recordEle.elementTextTrim("vch_type"));
                M.put("VCH_UNIT", recordEle.elementTextTrim("vch_unit"));

                M.put("PRICE", recordEle.elementTextTrim("price"));
                M.put("ABLECOUNT", recordEle.elementTextTrim("ablecount"));
                M.put("VCH_FROMNAME", recordEle.elementTextTrim("vch_fromName"));
                M.put("ID", recordEle.elementTextTrim("ID"));

                list.add(M);
            }

            // 日志 ---- 日志内容 - 日志报文 - 时间 - 日志类型 - 人员编码
            java.util.Date currentTime = new java.util.Date();
            SimpleDateFormat Format = new SimpleDateFormat("yyyy-MM-dd");
            String titleNameTime = Format.format(currentTime);

            webPCService.PRO_LOG_WEB_SET("服务日志:" + MMEquurl,
                    null, titleNameTime, "WS_Equip", x_personcode);
            test.put("list", list);

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return test;
    }

    /*
     *
     * */
    @RequestMapping(value = "/WS_MMToXLReadMaterailService", method = RequestMethod.POST)
    @ResponseBody
    public Map WS_MMToXLReadMaterailService(@RequestParam(value = "x_code") String x_code,
                                            @RequestParam(value = "x_name") String x_name,
                                            @RequestParam(value = "x_type") String x_type,
                                            @RequestParam(value = "x_personcode") String x_personcode,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map test = new HashMap();
        List<Map> result = null;
        try {

            Client client = new Client(new URL(MMXlurl));

            Object[] results = client.invoke("ReadMaterail", new String[]{x_code, x_name, x_type});

            Document doc = DocumentHelper.parseText(results[0].toString());

            Element rootElt = doc.getRootElement();                //获取根节点
            Iterator iter = rootElt.elementIterator("mat");        //获取二级节点
            List<Map> list = new ArrayList<Map>();

            while (iter.hasNext()) {

                Element recordEle = (Element) iter.next();           //输出下一行

                Map M = new HashMap();

                M.put("MAT_NO", recordEle.elementTextTrim("MAT_NO"));
                M.put("MAT_DESC", recordEle.elementTextTrim("MAT_DESC"));
                M.put("UNIT", recordEle.elementTextTrim("UNIT"));
                M.put("PLAN_PRICE", recordEle.elementTextTrim("PLAN_PRICE"));
                M.put("MAT_OLD_NO", recordEle.elementTextTrim("MAT_OLD_NO"));

                list.add(M);

                //日志  ----   日志内容 - 日志报文 - 时间 - 日志类型 - 人员编码
                java.util.Date currentTime = new java.util.Date();
                SimpleDateFormat Format = new SimpleDateFormat("yyyy-MM-dd");
                String titleNameTime = Format.format(currentTime);
                webPCService.PRO_LOG_WEB_SET("服务日志:"+MMXlurl, null, titleNameTime, "WS_MMToXL", x_personcode);
            }
            test.put("list", list);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return test;
    }

    @RequestMapping(value = "/SetMat", method = RequestMethod.POST)
    @ResponseBody
    public Map SetMat(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                      @RequestParam(value = "x_personcode") String x_personcode,
                      HttpServletRequest request,
                      HttpServletResponse response) throws Exception {
        Map test = new HashMap();
        List<Map> result = null;
        String resJson;
        try {
            Client client = new Client(new URL(MMSapurl));

            System.out.println("=====================输出WebService信息 Stsrt===========================");

            System.out.print("传入参数V_V_ORDERGUID : " + V_V_ORDERGUID);

            String xml = this.xmlData(V_V_ORDERGUID);

            Object[] results = client.invoke("WriteData", new Object[]{"", "NAPM_WORKORDER", xml});

            resJson = results[0].toString();
            if (resJson == null) {
                resJson = "-1";
            }
            test.put("V_CURSOR", resJson);

            System.out.println("返回信息状态 : " + results[0].toString());

            System.out.println("=====================输出WebService信息 End===========================");

            //日志  ----   日志内容 - 日志报文 - 时间 - 日志类型 - 人员编码
            java.util.Date currentTime = new java.util.Date();
            SimpleDateFormat Format = new SimpleDateFormat("yyyy-MM-dd");
            String titleNameTime = Format.format(currentTime);
            webPCService.PRO_LOG_WEB_SET("服务日志:"+MMSapurl, null, titleNameTime, "WS_MMToXL", x_personcode);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return test;
    }

    private String xmlData(String V_V_ORDERGUID) throws ParseException, SQLException {

        List<Map> listfirst = zdhService.PRO_PM_WORKORDER_GET(V_V_ORDERGUID);

        //root
        Document root = DocumentHelper.createDocument();
        //1
        Element WriteDataRequest = root.addElement("WriteDataRequest");
        //2
        Element PackName = WriteDataRequest.addElement("PackName");
        PackName.setText("NAPM_WORKORDER");

        Element WriteDataRecord = WriteDataRequest.addElement("WriteDataRecord");
        //3
        Element KeyFieldName = WriteDataRecord.addElement("KeyFieldName");
        Element Fields = WriteDataRecord.addElement("Fields");
        //4

        String ORDERID = listfirst.get(0).get("V_ORDERID").toString();  //底部留用

        Fields.addElement("ORDERID").setText(listfirst.get(0).get("V_ORDERID") == null ? "" : listfirst.get(0).get("V_ORDERID").toString());
        Fields.addElement("ORDER_TYP").setText(listfirst.get(0).get("V_ORDER_TYP") == null ? "" : listfirst.get(0).get("V_ORDER_TYP").toString());
        Fields.addElement("ORDER_TYP_TXT").setText(listfirst.get(0).get("V_ORDER_TYP_TXT") == null ? "" : listfirst.get(0).get("V_ORDER_TYP_TXT").toString());
        Fields.addElement("FUNC_LOC").setText(listfirst.get(0).get("V_FUNC_LOC") == null ? "" : listfirst.get(0).get("V_FUNC_LOC").toString());
        Fields.addElement("EQUIP_NO").setText(listfirst.get(0).get("V_EQUIP_NO") == null ? "" : listfirst.get(0).get("V_EQUIP_NO").toString());
        Fields.addElement("EQUIP_NAME").setText(listfirst.get(0).get("V_EQUIP_NAME") == null ? "" : listfirst.get(0).get("V_EQUIP_NAME").toString());

        Fields.addElement("PLANT").setText(listfirst.get(0).get("V_PLANT") == null ? "" : listfirst.get(0).get("V_PLANT").toString());
        Fields.addElement("IWERK").setText(listfirst.get(0).get("V_IWERK") == null ? "" : listfirst.get(0).get("V_IWERK").toString());
        Fields.addElement("START_DATE").setText(listfirst.get(0).get("D_START_DATE").toString() == "" ? "" : toFormat(listfirst.get(0).get("D_START_DATE").toString()));
        Fields.addElement("FINISH_DATE").setText(listfirst.get(0).get("D_FINISH_DATE").toString() == "" ? "" : toFormat(listfirst.get(0).get("D_FINISH_DATE").toString()));
        Fields.addElement("ACT_TYPE").setText(listfirst.get(0).get("V_ACT_TYPE") == null ? "" : listfirst.get(0).get("V_ACT_TYPE").toString());

        Fields.addElement("PLANNER").setText(listfirst.get(0).get("V_PLANNER") == null ? "" : listfirst.get(0).get("V_PLANNER").toString());
        Fields.addElement("WORK_CTR").setText(listfirst.get(0).get("V_WORK_CTR") == null ? "" : listfirst.get(0).get("V_WORK_CTR").toString());
        Fields.addElement("SHORT_TXT").setText(listfirst.get(0).get("V_SHORT_TXT") == null ? "" : listfirst.get(0).get("V_SHORT_TXT").toString());
        Fields.addElement("GSBER").setText(listfirst.get(0).get("V_GSBER") == null ? "" : listfirst.get(0).get("V_GSBER").toString());
        Fields.addElement("GSBER_TXT").setText(listfirst.get(0).get("V_GSBER_TXT") == null ? "" : listfirst.get(0).get("V_GSBER_TXT").toString());

        Fields.addElement("WORK_AREA").setText(listfirst.get(0).get("V_DEPTNAME") == null ? "" : listfirst.get(0).get("V_DEPTNAME").toString());
        Fields.addElement("WBS").setText(listfirst.get(0).get("V_WBS") == null ? "" : listfirst.get(0).get("V_WBS").toString());
        Fields.addElement("WBS_TXT").setText(listfirst.get(0).get("V_WBS_TXT") == null ? "" : listfirst.get(0).get("V_WBS_TXT").toString());
        Fields.addElement("ENTERED_BY").setText(listfirst.get(0).get("V_CHECKMANSIGN") == null ? "" : listfirst.get(0).get("V_CHECKMANSIGN").toString());
        Fields.addElement("ENTER_DATE").setText(listfirst.get(0).get("D_ENTER_DATE") == null ? "" : this.toFormat(listfirst.get(0).get("D_ENTER_DATE").toString()));

        Fields.addElement("SYSNAME").setText("");
        Fields.addElement("SYSTEM_STATUS").setText(listfirst.get(0).get("SYSTEM_STATUS") == null ? "" : listfirst.get(0).get("SYSTEM_STATUS").toString());

        System.out.print(root.asXML());

        List<Map> listsecond = zdhService.PRO_PM_WORKORDER_ET_OPERATIONS1(V_V_ORDERGUID);

        for (int i = 0; i < listsecond.size(); i++) {
            Element ET_OPERATIONS = Fields.addElement("ET_OPERATIONS"); //添加子节点

            ET_OPERATIONS.addElement("ORDERID").setText(ORDERID);
            ET_OPERATIONS.addElement("ACTIVITY").setText(listsecond.get(i).get("V_ACTIVITY") == null ? "" : listsecond.get(i).get("V_ACTIVITY").toString());
            ET_OPERATIONS.addElement("SUB_ACTIVITY").setText(listsecond.get(i).get("V_SUB_ACTIVITY") == null ? "" : listsecond.get(i).get("V_SUB_ACTIVITY").toString());
            ET_OPERATIONS.addElement("CONTROL_KEY").setText(listsecond.get(i).get("V_CONTROL_KEY") == null ? "" : listsecond.get(i).get("V_CONTROL_KEY").toString());

            ET_OPERATIONS.addElement("DESCRIPTION").setText(listsecond.get(i).get("V_DESCRIPTION") == null ? "" : listsecond.get(i).get("V_DESCRIPTION").toString());
            ET_OPERATIONS.addElement("NUMBER_OF_CAPACITIES").setText(listsecond.get(i).get("I_NUMBER_OF_CAPACITIES") == null ? "" : listsecond.get(i).get("I_NUMBER_OF_CAPACITIES").toString());
            ET_OPERATIONS.addElement("WORK_ACTIVITY").setText(listsecond.get(i).get("I_WORK_ACTIVITY") == null ? "" : listsecond.get(i).get("I_WORK_ACTIVITY").toString());
            ET_OPERATIONS.addElement("UN_WORK").setText(listsecond.get(i).get("V_UN_WORK") == null ? "" : listsecond.get(i).get("V_UN_WORK").toString());
            ET_OPERATIONS.addElement("DURATION_NORMAL").setText(listsecond.get(i).get("I_DURATION_NORMAL") == null ? "" : listsecond.get(i).get("I_DURATION_NORMAL").toString());

            ET_OPERATIONS.addElement("DURATION_NORMAL_UNIT").setText(listsecond.get(i).get("V_DURATION_NORMAL_UNIT") == null ? "" : listsecond.get(i).get("V_DURATION_NORMAL_UNIT").toString());
            ET_OPERATIONS.addElement("WORK_CENTER").setText(listsecond.get(i).get("V_WORK_CENTER") == null ? "" : listsecond.get(i).get("V_WORK_CENTER").toString());
            ET_OPERATIONS.addElement("ACTUAL_TIME").setText(listsecond.get(i).get("I_ACTUAL_TIME") == null ? "" : listsecond.get(i).get("I_ACTUAL_TIME").toString());
            ET_OPERATIONS.addElement("NUMBER_OF_PEOPLE").setText(listsecond.get(i).get("I_NUMBER_OF_PEOPLE") == null ? "" : listsecond.get(i).get("I_NUMBER_OF_PEOPLE").toString());
        }

        List<Map> listthird = zdhService.PRO_PM_WORKORDER_SPARE_VIEW1(V_V_ORDERGUID);

        System.out.print("---------------------------物料信息开始----------------------------");
        System.out.println("第三段长度 : " + listthird.size());

        for (int i = 0; i < listthird.size(); i++) {

            Element Materials = Fields.addElement("Materials"); //添加子节点

            System.out.println(listthird.get(0).get("I_KC_ID").toString());

            Materials.addElement("ORDERID").setText(ORDERID);
            Materials.addElement("ACTIVITY").setText(listthird.get(i).get("V_ACTIVITY") == null ? "" : listthird.get(i).get("V_ACTIVITY").toString());

            Materials.addElement("materialcode").setText(listthird.get(i).get("V_MATERIALCODE") == null ? "" : listthird.get(i).get("V_MATERIALCODE").toString());
            Materials.addElement("materialname").setText(listthird.get(i).get("V_MATERIALNAME") == null ? "" : listthird.get(i).get("V_MATERIALNAME").toString());
            Materials.addElement("materialunit").setText(listthird.get(i).get("V_UNIT") == null ? "" : listthird.get(i).get("V_UNIT").toString());
            Materials.addElement("f_price").setText(listthird.get(i).get("F_UNITPRICE") == null ? "" : listthird.get(i).get("F_UNITPRICE").toString());
            Materials.addElement("pln_amount").setText(listthird.get(i).get("I_PLANAMOUNT") == null ? "" : listthird.get(i).get("I_PLANAMOUNT").toString());
            Materials.addElement("kc_id").setText(listthird.get(i).get("I_KC_ID") == null ? "" : listthird.get(i).get("I_KC_ID").toString());
        }


        System.out.println("生成XML : " + root.asXML());

        return root.asXML();

    }

    public String toFormat(String str) throws ParseException {

        str = str.replaceAll("-", "");
        str = str.substring(0, 8);

        return str;
    }


    @RequestMapping(value = "/WS_EquipGetBillMaterialByOrderService", method = RequestMethod.POST)
    @ResponseBody
    public Map WS_EquipGetBillMaterialByOrderService(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                     @RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
                                                     @RequestParam(value = "x_personcode") String x_personcode,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map test = new HashMap();
        List<Map> result = null;
        String resJson;
        try {
            Client client = new Client(new URL(MMEquurl));

            System.out.println("=====================输出WebService信息 Stsrt===========================");

            System.out.print("传入参数V_V_ORDERGUID : " + V_V_ORDERGUID);


            Object[] results = client.invoke("getBillMaterialByOrder", new Object[]{V_V_ORDERID});

            Document doc = DocumentHelper.parseText(results[0].toString());

            Element rootElt = doc.getRootElement();                //获取根节点
            Iterator iter = rootElt.elementIterator("Bill");        //获取二级节点
            List<Map> list = new ArrayList<Map>();

            String billcode = "";
            String vch_sparepart_code = "";
            String vch_sparepart_name = "";
            String vch_type = "";
            String vch_unit = "";
            String BillType = "";
            String price = "0";
            String f_number = "0";

            while (iter.hasNext()) {

                Element recordEle = (Element) iter.next();           //输出下一行

                Map M = new HashMap();

                billcode = recordEle.elementTextTrim("billcode");
                vch_sparepart_code = recordEle.elementTextTrim("vch_sparepart_code");
                vch_sparepart_name = recordEle.elementTextTrim("vch_sparepart_name");

                vch_type = recordEle.elementTextTrim("vch_type");

                vch_unit = recordEle.elementTextTrim("vch_unit");
                price = recordEle.elementTextTrim("price");
                f_number = recordEle.elementTextTrim("f_number");
                BillType = recordEle.elementTextTrim("BillType");

                list.add(M);

                result = zdhService.PRO_PM_WORKORDER_SPARE_MM_SET(V_V_ORDERGUID, V_V_ORDERID, billcode, vch_sparepart_code,
                        vch_sparepart_name, vch_type, vch_unit, price, f_number, BillType);

            }
            result = zdhService.PRO_PM_WORKORDER_SPARE_UPDATE(V_V_ORDERGUID);
            resJson = "SUCCESS";
            test.put("V_CURSOR", resJson);

            //日志  ----   日志内容 - 日志报文 - 时间 - 日志类型 - 人员编码
            java.util.Date currentTime = new java.util.Date();
            SimpleDateFormat Format = new SimpleDateFormat("yyyy-MM-dd");
            String titleNameTime = Format.format(currentTime);
            webPCService.PRO_LOG_WEB_SET("服务日志:"+MMEquurl, null, titleNameTime, "WS_MMToXL", x_personcode);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            test.put("V_CURSOR", "Fail");
        } catch (Exception e) {
            test.put("V_CURSOR", "Fail");
            e.printStackTrace();
        }

        return test;
    }


}
