package org.building.pm.webcontroller;

import org.apache.poi.hssf.usermodel.*;
import org.building.pm.webservice.OldRepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 备件修旧Controller
 * 调用namm_ak数据库
 * Created by zjh on 2018/2/12.
 */
@Controller
@RequestMapping("/app/pm/oldR")
public class OldRepairController {

    @Autowired
    private OldRepairService oldRepairService;


    /*
    *获取待维修库房列表
    * */
    @RequestMapping(value = "/Query_OldRepair_Room", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> Query_OldRepair_Room(@RequestParam(value = "V_SAP_PLANTCODE") String V_SAP_PLANTCODE,
                                                    @RequestParam(value = "V_SAP_DEPARTCODE") String V_SAP_DEPARTCODE) throws Exception {
        Map result = oldRepairService.getJunkWaitMendStoreList(V_SAP_PLANTCODE, V_SAP_DEPARTCODE);
        return result;
    }


    /*
    *获取待修旧件库存
    * */
    @RequestMapping(value = "/Query_OldRepair", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> Query_OldRepair(@RequestParam(value = "V_SAP_PLANTCODE") String V_SAP_PLANTCODE,
                                               @RequestParam(value = "V_SAP_DEPARTCODE") String V_SAP_DEPARTCODE,
                                               @RequestParam(value = "V_STOREID") String V_STOREID,
                                               @RequestParam(value = "V_MAT_NO") String V_MAT_NO,
                                               @RequestParam(value = "V_MAT_DESC") String V_MAT_DESC) throws Exception {
        Map result = oldRepairService.GETWAITMENDKCTABLE(V_SAP_PLANTCODE, V_SAP_DEPARTCODE,V_STOREID,V_MAT_NO,V_MAT_DESC);
        return result;
    }

    @RequestMapping(value = "/PG_MM_JUNK_INTERFACE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PG_MM_JUNK_INTERFACE(@RequestParam(value = "V_USERID") String V_USERID,
                                               @RequestParam(value = "V_KCID") String V_KCID,
                                               @RequestParam(value = "F_MEND_AMOUNT") int F_MEND_AMOUNT,
                                               @RequestParam(value = "V_ORDERID") String V_ORDERID) throws Exception{
        Map result = oldRepairService.PG_MM_JUNK_INTERFACE(V_USERID, V_KCID,F_MEND_AMOUNT,V_ORDERID);
        return result;
    }
    /*
    *获取待修旧件库存导出Excel
    * */
    @RequestMapping(value = "/Query_OldRepair_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void Query_OldRepair_EXCEL(@RequestParam(value = "V_SAP_PLANTCODE") String V_SAP_PLANTCODE,
                                      @RequestParam(value = "V_SAP_DEPARTCODE") String V_SAP_DEPARTCODE,
                                      @RequestParam(value = "V_STOREID") String V_STOREID,
                                      @RequestParam(value = "V_MAT_NO") String V_MAT_NO,
                                      @RequestParam(value = "V_MAT_DESC") String V_MAT_DESC,
                                      HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = oldRepairService.GETWAITMENDKCTABLE(V_SAP_PLANTCODE, V_SAP_DEPARTCODE, V_STOREID, V_MAT_NO, V_MAT_DESC);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);

        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("库存ID");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("旧件编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("旧件名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("库存数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("库房标书");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("修改时间");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i+1);

                row.createCell((short) 1).setCellValue(map.get("KCID") == null ? "" : map.get("KCID").toString());

                row.createCell((short) 2).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 3).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());

                row.createCell((short) 5).setCellValue(map.get("AMOUNT") == null ? "" : map.get("AMOUNT").toString());

                row.createCell((short) 6).setCellValue(map.get("STORENAME") == null ? "" : map.get("STORENAME").toString());

                row.createCell((short) 7).setCellValue(map.get("UPDATEDATE") == null ? "" : map.get("UPDATEDATE").toString());


            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("修旧工单.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    //获取待修旧件库存
    @RequestMapping(value = "/getWaitMendKcTable", method = RequestMethod.POST)
    @ResponseBody
    public Map getWaitMendKcTable(
            @RequestParam(value = "v_sap_plantcode") String v_sap_plantcode,
            @RequestParam(value = "v_sap_departcode") String v_sap_departcode,
            @RequestParam(value = "v_storeid") String v_storeid,
            @RequestParam(value = "v_mat_no") String v_mat_no,
            @RequestParam(value = "v_mat_desc") String v_mat_desc,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return oldRepairService.getWaitMendKcTable(v_sap_plantcode, v_sap_departcode, v_storeid, v_mat_no, v_mat_desc);
    }


    //获取待维修库房列表
    @RequestMapping(value = "/getJunkWaitMendStoreList", method = RequestMethod.POST)
    @ResponseBody
    public Map getJunkWaitMendStoreList(
            @RequestParam(value = "v_sap_plantcode") String v_sap_plantcode,
            @RequestParam(value = "v_sap_departcode") String v_sap_departcode,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return oldRepairService.getJunkWaitMendStoreList(v_sap_plantcode, v_sap_departcode);
    }

    //维修工单出库
    @RequestMapping(value = "/outputMendForOrder", method = RequestMethod.POST)
    @ResponseBody
    public Map outputMendForOrder(
            @RequestParam(value = "v_userid") String v_userid,
            @RequestParam(value = "v_kcid") String v_kcid,
            @RequestParam(value = "f_mend_amount") int f_mend_amount,
            @RequestParam(value = "v_orderid") String v_orderid,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return oldRepairService.outputMendForOrder(v_userid, v_kcid, f_mend_amount, v_orderid);
    }
}
