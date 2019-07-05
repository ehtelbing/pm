package org.building.pm.webcontroller;

import org.building.pm.service.ZdhService;
import org.building.pm.service.CxyService;
import org.building.pm.webservice.MMService;
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
    private MMService mmService;
    @Autowired
    private ZdhService zdhService;
    @Autowired
    private CxyService cxyService;
    @Autowired
    private WxjhController wxjhController;

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
                String setret = mmService.PRO_PM_WORKORDER_SPARE_MM_SET(V_V_ORDERGUID, V_V_ORDERID, billcode, vch_sparepart_code, vch_sparepart_name, vch_type,
                        vch_unit, price, f_number, BillType);
            }

            String ret = mmService.PRO_PM_WORKORDER_SPARE_UPDATE(V_V_ORDERGUID);

            String V_V_log = "服务日志־" + MMEquurl;


            Date currentTime = new Date();
            SimpleDateFormat Format = new SimpleDateFormat("yyyy-MM-dd");
            String titleNameTime = Format.format(currentTime);
            mmService.PRO_LOG_WEB_SET(V_V_log, null, titleNameTime, "WS_Equip", V_V_PERCODE);
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
            String V_V_log = "服务日志־" + MMEquurl;

            Date currentTime = new Date();
            SimpleDateFormat Format = new SimpleDateFormat("yyyy-MM-dd");
            String titleNameTime = Format.format(currentTime);
            mmService.PRO_LOG_WEB_SET(V_V_log, null, titleNameTime, "WS_Equip", V_V_PERCODE);
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
                            sap_departcode, storeplace, i_from_id});


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

                M.put("INPUT_DATE", recordEle.elementTextTrim("input_date"));

                list.add(M);
            }

            // 日志 ---- 日志内容 - 日志报文 - 时间 - 日志类型 - 人员编码
            java.util.Date currentTime = new java.util.Date();
            SimpleDateFormat Format = new SimpleDateFormat("yyyy-MM-dd");
            String titleNameTime = Format.format(currentTime);

            mmService.PRO_LOG_WEB_SET("服务日志:" + MMEquurl,
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
     *物资库房接口
     * */
    @RequestMapping(value = "/GetMatTable", method = RequestMethod.POST)
    @ResponseBody
    public Map GetMatTable(@RequestParam(value = "code") String code,
                           @RequestParam(value = "name") String name,
                           @RequestParam(value = "x_personcode") String x_personcode) throws Exception {
        Map test = new HashMap();
        List<Map> result = null;
        try {
            Client client = new Client(new URL(MMEquurl));

            Object[] results = client.invoke("GetMatTable",
                    new Object[]{code, name});


            Document doc = DocumentHelper.parseText(results[0].toString());

            Element rootElt = doc.getRootElement(); // 获取根节点
            Iterator iter = rootElt.elementIterator("Material"); // 获取二级节点
            List<Map> list = new ArrayList<Map>();

            while (iter.hasNext()) {

                Element recordEle = (Element) iter.next(); // 输出下一行

                Map M = new HashMap();

                M.put("mat_no",
                        recordEle.elementTextTrim("mat_no"));
                M.put("mat_desc",
                        recordEle.elementTextTrim("mat_desc"));
                M.put("unit", recordEle.elementTextTrim("unit"));
                M.put("ltext", recordEle.elementTextTrim("ltext"));

                M.put("plan_price", recordEle.elementTextTrim("plan_price"));
                M.put("days", recordEle.elementTextTrim("days"));

                list.add(M);
            }

            // 日志 ---- 日志内容 - 日志报文 - 时间 - 日志类型 - 人员编码
            java.util.Date currentTime = new java.util.Date();
            SimpleDateFormat Format = new SimpleDateFormat("yyyy-MM-dd");
            String titleNameTime = Format.format(currentTime);

            mmService.PRO_LOG_WEB_SET("服务日志:" + MMEquurl,
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
                mmService.PRO_LOG_WEB_SET("服务日志:" + MMXlurl, null, titleNameTime, "WS_MMToXL", x_personcode);
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
        boolean bs = false;
        try {
            String id = "";
            String str = "";
            List<Map> list = zdhService.PRO_PM_WORKORDER_GET(V_V_ORDERGUID);
            if (list.size() > 0) {
                Map map = list.get(0);
                List listfirst = (List) map.get("list");
                if (listfirst.size() > 0) {
                    Map fmap = (Map) listfirst.get(0);
                    id = fmap.get("V_ORDERID").toString();
                    str = id.substring(0, 2);
                    if (!str.equals("88")) {
                        String state = fmap.get("SYSTEM_STATUS").toString();  //状态
                        if (!state.equals("TECO")) {// 已发的 不在发送
                            bs = valicate(V_V_ORDERGUID, x_personcode, request, response);

                            System.out.println("=====================输出发送SAP工单接口 Stsrt===========================");
                            System.out.println("=====================输出发送SAP工单接口 :" + bs + "===========================");
                            System.out.println("=====================输出发送SAP工单接口 End===========================");

                        }
                        if (bs) {
                            List<Map> list11 = zdhService.PRO_PM_WORKORDER_SPARE_VIEW1(V_V_ORDERGUID);
                            if (list11.size() > 0) {
                                Map map11 = list11.get(0);
                                List list13 = (List) map11.get("list");
                                if (list13.size() == 0) {
                                    test.put("V_CURSOR", '1');
                                    return test;
                                }
                            }
                        }
                    }
                }
            }

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
            mmService.PRO_LOG_WEB_SET("服务日志:" + MMSapurl, null, titleNameTime, "WS_MMToXL", x_personcode);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return test;
    }

    private boolean valicate(String orderguid, String personcode, HttpServletRequest request,
                             HttpServletResponse response) throws Exception {
        List<Map> viewlist = cxyService.PRO_PM_WORKORDER_SPARE_TOSAP_VIEW(orderguid);
        Map viewmap = viewlist.get(0);
        List list = (List) viewmap.get("list");

        for (int i = 0; i < list.size(); i++) {
            Double sum = 0.0;
            Map map = (Map) list.get(i);
            String materialcode = map.get("V_MATERIALCODE").toString();
            String plant = map.get("V_PLANT").toString();
            String workarea = map.get("V_WORK_AREA").toString();
            String mid = map.get("I_ID").toString();
            Map listmaps = this.GetDepartKC_storeid(1000, materialcode, "", plant, workarea, "", "0", personcode, request, response);
            List mylist = (List) listmaps.get("list");
            for (int j = 0; j < mylist.size(); j++) {
                Map map6 = (Map) mylist.get(j);
                sum += Double.parseDouble(map6.get("ABLECOUNT").toString() == null ? "0" : map6.get("ABLECOUNT").toString());
            }
            cxyService.PRO_PM_WORKORDER_SPARE_MMORSAP(orderguid, mid, materialcode, sum);//?合计有问题
        }
        Map maplast = (Map) cxyService.PRO_PM_WORKORDER_IS_TOSAP(orderguid);
        String info = maplast.get("V_INFO").toString();
        String tosap = maplast.get("V_IS_TOSAP").toString();
        if (info.equals("success") && tosap.equals("是")) {
            wxjhController.SI_SpotChkProj_in(orderguid);
            //调用（SAP工单接收）接口,发送工单主体信息（不带工序和物料信息）到SAP系统
            return true;
        }
        return false;
    }

    private String xmlData(String V_V_ORDERGUID) throws ParseException, SQLException {

        List<Map> flist = zdhService.PRO_PM_WORKORDER_GET(V_V_ORDERGUID);

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


        Map map = flist.get(0);

        List listfirst = (List) map.get("list");
        Map fmap = (Map) listfirst.get(0);
        String ORDERID = fmap.get("V_ORDERID").toString();  //底部留用

        Fields.addElement("ORDERID").setText(fmap.get("V_ORDERID") == null ? "" : fmap.get("V_ORDERID").toString());
        Fields.addElement("ORDER_TYP").setText(fmap.get("V_ORDER_TYP") == null ? "" : fmap.get("V_ORDER_TYP").toString());
        Fields.addElement("ORDER_TYP_TXT").setText(fmap.get("V_ORDER_TYP_TXT") == null ? "" : fmap.get("V_ORDER_TYP_TXT").toString());
        Fields.addElement("FUNC_LOC").setText(fmap.get("V_FUNC_LOC") == null ? "" : fmap.get("V_FUNC_LOC").toString());
        Fields.addElement("EQUIP_NO").setText(fmap.get("V_EQUIP_NO") == null ? "" : fmap.get("V_EQUIP_NO").toString());
        Fields.addElement("EQUIP_NAME").setText(fmap.get("V_EQUIP_NAME") == null ? "" : fmap.get("V_EQUIP_NAME").toString());

        Fields.addElement("PLANT").setText(fmap.get("V_PLANT") == null ? "" : fmap.get("V_PLANT").toString());
        Fields.addElement("IWERK").setText(fmap.get("V_IWERK") == null ? "" : fmap.get("V_IWERK").toString());
        Fields.addElement("START_DATE").setText(fmap.get("D_START_DATE").toString() == "" ? "" : toFormat(fmap.get("D_START_DATE").toString()));
        Fields.addElement("FINISH_DATE").setText(fmap.get("D_FINISH_DATE").toString() == "" ? "" : toFormat(fmap.get("D_FINISH_DATE").toString()));
        Fields.addElement("ACT_TYPE").setText(fmap.get("V_ACT_TYPE") == null ? "" : fmap.get("V_ACT_TYPE").toString());

        Fields.addElement("PLANNER").setText(fmap.get("V_PLANNER") == null ? "" : fmap.get("V_PLANNER").toString());
        Fields.addElement("WORK_CTR").setText(fmap.get("V_WORK_CTR") == null ? "" : fmap.get("V_WORK_CTR").toString());
        Fields.addElement("SHORT_TXT").setText(fmap.get("V_SHORT_TXT") == null ? "" : fmap.get("V_SHORT_TXT").toString());
        Fields.addElement("GSBER").setText(fmap.get("V_GSBER") == null ? "" : fmap.get("V_GSBER").toString());
        Fields.addElement("GSBER_TXT").setText(fmap.get("V_GSBER_TXT") == null ? "" : fmap.get("V_GSBER_TXT").toString());

        Fields.addElement("WORK_AREA").setText(fmap.get("V_DEPTNAME") == null ? "" : fmap.get("V_DEPTNAME").toString());
        Fields.addElement("WBS").setText(fmap.get("V_WBS") == null ? "" : fmap.get("V_WBS").toString());
        Fields.addElement("WBS_TXT").setText(fmap.get("V_WBS_TXT") == null ? "" : fmap.get("V_WBS_TXT").toString());
        Fields.addElement("ENTERED_BY").setText(fmap.get("V_CHECKMANSIGN") == null ? "" : fmap.get("V_CHECKMANSIGN").toString());
        Fields.addElement("ENTER_DATE").setText(fmap.get("D_ENTER_DATE") == null ? "" : this.toFormat(fmap.get("D_ENTER_DATE").toString()));

        Fields.addElement("SYSNAME").setText("");
        Fields.addElement("SYSTEM_STATUS").setText(fmap.get("SYSTEM_STATUS") == null ? "" : fmap.get("SYSTEM_STATUS").toString());

        System.out.print(root.asXML());

        List<Map> listsecond = zdhService.PRO_PM_WORKORDER_ET_OPERATIONS1(V_V_ORDERGUID);

        if (listsecond.size() > 0) {
            Map smap = listsecond.get(0);

            List slrst = (List) smap.get("list");

            for (int i = 0; i < slrst.size(); i++) {
                Map srmap = (Map) slrst.get(i);

                Element ET_OPERATIONS = Fields.addElement("ET_OPERATIONS"); //添加子节点

                ET_OPERATIONS.addElement("ORDERID").setText(ORDERID);
                ET_OPERATIONS.addElement("ACTIVITY").setText(srmap.get("V_ACTIVITY") == null ? "" : srmap.get("V_ACTIVITY").toString());
                ET_OPERATIONS.addElement("SUB_ACTIVITY").setText(srmap.get("V_SUB_ACTIVITY") == null ? "" : srmap.get("V_SUB_ACTIVITY").toString());
                ET_OPERATIONS.addElement("CONTROL_KEY").setText(srmap.get("V_CONTROL_KEY") == null ? "" : srmap.get("V_CONTROL_KEY").toString());

                ET_OPERATIONS.addElement("DESCRIPTION").setText(srmap.get("V_DESCRIPTION") == null ? "" : srmap.get("V_DESCRIPTION").toString());
                ET_OPERATIONS.addElement("NUMBER_OF_CAPACITIES").setText(srmap.get("I_NUMBER_OF_CAPACITIES") == null ? "" : srmap.get("I_NUMBER_OF_CAPACITIES").toString());
                ET_OPERATIONS.addElement("WORK_ACTIVITY").setText(srmap.get("I_WORK_ACTIVITY") == null ? "" : srmap.get("I_WORK_ACTIVITY").toString());
                ET_OPERATIONS.addElement("UN_WORK").setText(srmap.get("V_UN_WORK") == null ? "" : srmap.get("V_UN_WORK").toString());
                ET_OPERATIONS.addElement("DURATION_NORMAL").setText(srmap.get("I_DURATION_NORMAL") == null ? "" : srmap.get("I_DURATION_NORMAL").toString());

                ET_OPERATIONS.addElement("DURATION_NORMAL_UNIT").setText(srmap.get("V_DURATION_NORMAL_UNIT") == null ? "" : srmap.get("V_DURATION_NORMAL_UNIT").toString());
                ET_OPERATIONS.addElement("WORK_CENTER").setText(srmap.get("V_WORK_CENTER") == null ? "" : srmap.get("V_WORK_CENTER").toString());
                ET_OPERATIONS.addElement("ACTUAL_TIME").setText(srmap.get("I_ACTUAL_TIME") == null ? "" : srmap.get("I_ACTUAL_TIME").toString());
                ET_OPERATIONS.addElement("NUMBER_OF_PEOPLE").setText(srmap.get("I_NUMBER_OF_PEOPLE") == null ? "" : srmap.get("I_NUMBER_OF_PEOPLE").toString());
            }
        }


        List<Map> listthird = zdhService.PRO_PM_WORKORDER_SPARE_VIEW1(V_V_ORDERGUID);

        System.out.print("---------------------------物料信息开始----------------------------");
        System.out.println("第三段长度 : " + listthird.size());

        if (listthird.size() > 0) {
            Map tmap = listthird.get(0);

            List tlrst = (List) tmap.get("list");

            for (int i = 0; i < tlrst.size(); i++) {

                Map trmap = (Map) tlrst.get(i);

                Element Materials = Fields.addElement("Materials"); //添加子节点

                System.out.println(trmap.get("I_KC_ID").toString());

                Materials.addElement("ORDERID").setText(ORDERID);
                Materials.addElement("ACTIVITY").setText(trmap.get("V_ACTIVITY") == null ? "" : trmap.get("V_ACTIVITY").toString());

                Materials.addElement("materialcode").setText(trmap.get("V_MATERIALCODE") == null ? "" : trmap.get("V_MATERIALCODE").toString());
                Materials.addElement("materialname").setText(trmap.get("V_MATERIALNAME") == null ? "" : trmap.get("V_MATERIALNAME").toString());
                Materials.addElement("materialunit").setText(trmap.get("V_UNIT") == null ? "" : trmap.get("V_UNIT").toString());
                Materials.addElement("f_price").setText(trmap.get("F_UNITPRICE") == null ? "" : trmap.get("F_UNITPRICE").toString());
                Materials.addElement("pln_amount").setText(trmap.get("I_PLANAMOUNT") == null ? "" : trmap.get("I_PLANAMOUNT").toString());
                Materials.addElement("kc_id").setText(trmap.get("I_KC_ID") == null ? "" : trmap.get("I_KC_ID").toString());
            }
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
            mmService.PRO_LOG_WEB_SET("服务日志:" + MMEquurl, null, titleNameTime, "WS_MMToXL", x_personcode);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            test.put("V_CURSOR", "Fail");
        } catch (Exception e) {
            test.put("V_CURSOR", "Fail");
            e.printStackTrace();
        }

        return test;
    }

    /*
     * 预装件工单验收
     * */

    @RequestMapping(value = "/WS_EquipService", method = RequestMethod.POST)
    @ResponseBody
    public Map WS_EquipService(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                               @RequestParam(value = "x_personcode") String x_personcode) throws Exception {

        Map result = new HashMap();

        List<String> str = mmService.PRO_PM_WORKORDER_YS_YZJ(V_V_ORDERGUID);

        String ff = str.get(str.size() - 1);
        if (str.get(str.size() - 1).equals("1")) {

            //调用webService
            Client client = new Client(new URL(MMEquurl));

            String billcode = str.get(0);
            String sap_departcode = str.get(1);
            String materialcode = str.get(2);
            String materialname = str.get(3);
            String vch_type = str.get(4);
            String unit = str.get(5);
            Double Amount = Double.parseDouble(str.get(6).toString());
            Object[] results = client.invoke("PreloadMatInput", new Object[]{billcode, sap_departcode, materialcode, materialname, vch_type, unit, Amount});
            result.put("msg", results[0].toString());
        }
        return result;
    }

}
