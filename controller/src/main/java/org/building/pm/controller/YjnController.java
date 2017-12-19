package org.building.pm.controller;

import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.YjnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by yjn on 2017/12/12.
 * <p/>
 * 电网试验基础信息管理controller
 */
@Controller
@RequestMapping("/app/pm/yjn")
public class YjnController {
    @Autowired
    private YjnService yjnService;

    //试验项目类型查询
    @RequestMapping(value = "PRO_SY101_ITEMTYPELIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_SY101_ITEMTYPELIST(HttpServletRequest request) throws SQLException {
        return yjnService.PRO_SY101_ITEMTYPELIST();
    }

    //增加试验项目类型
    @RequestMapping(value = "/PRO_SY101_ADDITEMTYPE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY101_ADDITEMTYPE(
            @RequestParam(value = "ITEMTYPE") String ITEMTYPE,
            @RequestParam(value = "ITEMTYPE_DESC") String ITEMTYPE_DESC,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return yjnService.PRO_SY101_ADDITEMTYPE(ITEMTYPE, ITEMTYPE_DESC);
    }

    //修改试验项目类型
    @RequestMapping(value = "/PRO_SY101_UPDATEITEMTYPE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY101_UPDATEITEMTYPE(
            @RequestParam(value = "ITEMTYPE") String ITEMTYPE,
            @RequestParam(value = "ITEMTYPE_DESC") String ITEMTYPE_DESC,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return yjnService.PRO_SY101_UPDATEITEMTYPE(ITEMTYPE, ITEMTYPE_DESC);
    }

    //删除试验项目类型
    @RequestMapping(value = "/PRO_SY101_DELETEITEMTYPE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY101_DELETEITEMTYPE(
            @RequestParam(value = "ITEMTYPE") String ITEMTYPE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_SY101_DELETEITEMTYPE(ITEMTYPE);
    }

    //启用试验项目类型
    @RequestMapping(value = "/PRO_SY101_STARTITEMTYPE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY101_STARTITEMTYPE(
            @RequestParam(value = "ITEMTYPE") String ITEMTYPE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return yjnService.PRO_SY101_STARTITEMTYPE(ITEMTYPE);
    }

    //停用试验项目类型
    @RequestMapping(value = "/PRO_SY101_STOPITEMTYPE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY101_STOPITEMTYPE(
            @RequestParam(value = "ITEMTYPE") String ITEMTYPE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return yjnService.PRO_SY101_STOPITEMTYPE(ITEMTYPE);
    }

    //查询厂矿列表
    @RequestMapping(value = "/PRO_MM_PLANT", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_MM_PLANT(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return yjnService.PRO_MM_PLANT();
    }

    //查询厂矿部门列表
    @RequestMapping(value = "/PRO_MM_DEPART", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_MM_DEPART(
            @RequestParam(value = "DEPARTCODE") String DEPARTCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_MM_DEPART(DEPARTCODE);
    }

    //查询试验地点
    @RequestMapping(value = "/PRO_SY103_LOCLIST", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY103_LOCLIST(
            @RequestParam(value = "PLANTCODE_IN") String PLANTCODE_IN,
            @RequestParam(value = "DEPARTCODE_IN") String DEPARTCODE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_SY103_LOCLIST(PLANTCODE_IN, DEPARTCODE_IN);
    }

    //新增试验地点
    @RequestMapping(value = "/PRO_SY103_ADDLOC", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY103_ADDLOC(
            @RequestParam(value = "LOCCODE_IN") String LOCCODE_IN,
            @RequestParam(value = "LOCDESC_IN") String LOCDESC_IN,
            @RequestParam(value = "PLANTCODE_IN") String PLANTCODE_IN,
            @RequestParam(value = "PLANTNAME_IN") String PLANTNAME_IN,
            @RequestParam(value = "DEPARTCODE_IN") String DEPARTCODE_IN,
            @RequestParam(value = "DEPARTNAME_IN") String DEPARTNAME_IN,
            @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
            @RequestParam(value = "USERNAME_IN") String USERNAME_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_SY103_ADDLOC(LOCCODE_IN, LOCDESC_IN, PLANTCODE_IN, PLANTNAME_IN,
                DEPARTCODE_IN, DEPARTNAME_IN, USERCODE_IN, USERNAME_IN);
    }

    //修改试验地点
    @RequestMapping(value = "/PRO_SY103_UPDATELOC", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY103_UPDATELOC(
            @RequestParam(value = "LOCCODE_IN") String LOCCODE_IN,
            @RequestParam(value = "LOCDESC_IN") String LOCDESC_IN,
            @RequestParam(value = "PLANTCODE_IN") String PLANTCODE_IN,
            @RequestParam(value = "PLANTNAME_IN") String PLANTNAME_IN,
            @RequestParam(value = "DEPARTCODE_IN") String DEPARTCODE_IN,
            @RequestParam(value = "DEPARTNAME_IN") String DEPARTNAME_IN,
            @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
            @RequestParam(value = "USERNAME_IN") String USERNAME_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_SY103_UPDATELOC(LOCCODE_IN, LOCDESC_IN, PLANTCODE_IN, PLANTNAME_IN,
                DEPARTCODE_IN, DEPARTNAME_IN, USERCODE_IN, USERNAME_IN);
    }

    //删除试验地点
    @RequestMapping(value = "/PRO_SY103_DELETELOC", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY103_DELETELOC(
            @RequestParam(value = "LOCCODE_IN") String LOCCODE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_SY103_DELETELOC(LOCCODE_IN);
    }

    //停用试验地点
    @RequestMapping(value = "/PRO_SY103_STOPLOC", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY103_STOPLOC(
            @RequestParam(value = "LOCCODE_IN") String LOCCODE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_SY103_STOPLOC(LOCCODE_IN);
    }

    //启用试验地点
    @RequestMapping(value = "/PRO_SY103_STARTLOC", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY103_STARTLOC(
            @RequestParam(value = "LOCCODE_IN") String LOCCODE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_SY103_STARTLOC(LOCCODE_IN);
    }

    //查询试验数据项目
    @RequestMapping(value = "/PRO_SY102_ITEMLIST", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY102_ITEMLIST(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_SY102_ITEMLIST();
    }

    //查询试验数据项目类型
    @RequestMapping(value = "/PRO_SY102_ITEMTYPELIST", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY102_ITEMTYPELIST(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_SY102_ITEMTYPELIST();
    }

    //新增试验数据项目
    @RequestMapping(value = "/PRO_SY102_ADDITEM", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY102_ADDITEM(
            @RequestParam(value = "ITEMCODE_IN") String ITEMCODE_IN,
            @RequestParam(value = "ITEMNAME_IN") String ITEMNAME_IN,
            @RequestParam(value = "TABLENAME_IN") String TABLENAME_IN,
            @RequestParam(value = "URL_IN") String URL_IN,
            @RequestParam(value = "OPURL_IN") String OPURL_IN,
            @RequestParam(value = "ITEMTYPECODE_IN") String ITEMTYPECODE_IN,
            @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
            @RequestParam(value = "USERNAME_IN") String USERNAME_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_SY102_ADDITEM(ITEMCODE_IN, ITEMNAME_IN, TABLENAME_IN, URL_IN,
                OPURL_IN, ITEMTYPECODE_IN, USERCODE_IN, USERNAME_IN);
    }

    //修改试验数据项目
    @RequestMapping(value = "/PRO_SY102_UPDATEITEM", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY102_UPDATEITEM(
            @RequestParam(value = "ITEMCODE_IN") String ITEMCODE_IN,
            @RequestParam(value = "ITEMNAME_IN") String ITEMNAME_IN,
            @RequestParam(value = "TABLENAME_IN") String TABLENAME_IN,
            @RequestParam(value = "URL_IN") String URL_IN,
            @RequestParam(value = "OPURL_IN") String OPURL_IN,
            @RequestParam(value = "ITEMTYPECODE_IN") String ITEMTYPECODE_IN,
            @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
            @RequestParam(value = "USERNAME_IN") String USERNAME_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_SY102_UPDATEITEM(ITEMCODE_IN, ITEMNAME_IN, TABLENAME_IN, URL_IN,
                OPURL_IN, ITEMTYPECODE_IN, USERCODE_IN, USERNAME_IN);
    }

    //删除试验数据项目
    @RequestMapping(value = "/PRO_SY102_DELETEITEM", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pro_sy102_deleteitem(
            @RequestParam(value = "ITEMCODE_IN") String ITEMCODE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_SY102_DELETEITEM(ITEMCODE_IN);
    }

    //停用试验数据项目
    @RequestMapping(value = "/PRO_SY102_STOPITEM", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pro_sy102_stopitem(
            @RequestParam(value = "ITEMCODE_IN") String ITEMCODE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_SY102_STOPITEM(ITEMCODE_IN);
    }

    //启用试验数据项目
    @RequestMapping(value = "/PRO_SY102_STARTITEM", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_SY102_STARTITEM(
            @RequestParam(value = "ITEMCODE_IN") String ITEMCODE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_SY102_STARTITEM(ITEMCODE_IN);
    }

    //查询10603检修单位
    @RequestMapping(value = "/PRO_DJ603_MENDDEPT", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ603_MENDDEPT(
            @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
            @RequestParam(value = "USERCODE_IN") String PLANTCODE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_DJ603_MENDDEPT(USERCODE_IN, PLANTCODE_IN);
    }

    //查询10603工单状态
    @RequestMapping(value = "/PRO_DJ_ORDERSTATUS", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ_ORDERSTATUS(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_DJ_ORDERSTATUS();
    }

    //查询10603工单
    @RequestMapping(value = "/PRO_DJ603_SELECTORDERLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ603_SELECTORDERLIST(
            @RequestParam(value = "MENDDEPT_CODE_in") String MENDDEPT_CODE_in,
            @RequestParam(value = "DJ_UQ_CODE_in") String DJ_UQ_CODE_in,
            @RequestParam(value = "DJ_NAME_in") String DJ_NAME_in,
            @RequestParam(value = "startDate") java.sql.Date startDate,
            @RequestParam(value = "endDate")@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")  Date endDate,
            @RequestParam(value = "ORDERID_in") String ORDERID_in,
            @RequestParam(value = "ORDER_STATUS_in") String ORDER_STATUS_in,
            @RequestParam(value = "person_in") String person_in,
            @RequestParam(value = "dj_vol_in") String dj_vol_in,
            Integer start, Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap();
        List<Map<String, Object>> pageList = new ArrayList();

        HashMap data = yjnService.PRO_DJ603_SELECTORDERLIST(MENDDEPT_CODE_in, DJ_UQ_CODE_in, DJ_NAME_in, startDate,
                endDate, ORDERID_in, ORDER_STATUS_in, person_in, dj_vol_in);
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);
        return result;
    }

    //查询10603当前工序
    @RequestMapping(value = "/PRO_DJ601_ORDERET", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ601_ORDERET(
            @RequestParam(value = "ORDERID_in") String ORDERID_in,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_DJ601_ORDERET(ORDERID_in);
    }

    //查询10603所需物料表
    @RequestMapping(value = "/PRO_DJ601_ORDERMAT", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ601_ORDERMAT(
            @RequestParam(value = "ORDERID_in") String ORDERID_in,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_DJ601_ORDERMAT(ORDERID_in);
    }

    //查询10603获取当前工单信息
    @RequestMapping(value = "/PRO_DJ601_ORDERMESSAGE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ601_ORDERMESSAGE(
            @RequestParam(value = "ORDERID_in") String ORDERID_in,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.PRO_DJ601_ORDERMESSAGE(ORDERID_in);
    }

    //查询10603单据数据获取
    @RequestMapping(value = "/GETMENDBILLDETAIL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GETMENDBILLDETAIL(
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return yjnService.GETMENDBILLDETAIL(A_ORDERID);
    }

    //导出10603检修工单
    @RequestMapping(value = "/ORDER_LIST_EXCEL", method = {RequestMethod.GET, RequestMethod.POST}, produces = "application/html;charset=UTF-8")
    //@ResponseBody
    public void ORDER_LIST_EXCEL(
            @RequestParam(value = "MENDDEPT_CODE_in") String MENDDEPT_CODE_in,
            @RequestParam(value = "DJ_UQ_CODE_in") String DJ_UQ_CODE_in,
            @RequestParam(value = "DJ_NAME_in") String DJ_NAME_in,
            @RequestParam(value = "startDate") java.sql.Date startDate,
            @RequestParam(value = "endDate")@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")Date endDate,
            @RequestParam(value = "ORDERID_in") String ORDERID_in,
            @RequestParam(value = "ORDER_STATUS_in") String ORDER_STATUS_in,
            @RequestParam(value = "person_in") String person_in,
            @RequestParam(value = "dj_vol_in") String dj_vol_in,
            HttpServletRequest request,
            HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        MENDDEPT_CODE_in = URLDecoder.decode(MENDDEPT_CODE_in, "UTF-8");
        DJ_UQ_CODE_in = URLDecoder.decode(DJ_UQ_CODE_in, "UTF-8");
        DJ_NAME_in = URLDecoder.decode(DJ_NAME_in, "UTF-8");
        ORDERID_in = URLDecoder.decode(ORDERID_in, "UTF-8");
        ORDER_STATUS_in = URLDecoder.decode(ORDER_STATUS_in, "UTF-8");
        person_in = URLDecoder.decode(person_in, "UTF-8");
        dj_vol_in = URLDecoder.decode(dj_vol_in, "UTF-8");
        Map<String, Object> data = yjnService.PRO_DJ603_SELECTORDERLIST(MENDDEPT_CODE_in, DJ_UQ_CODE_in, DJ_NAME_in, startDate,
                endDate, ORDERID_in, ORDER_STATUS_in, person_in, dj_vol_in);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet("工单");
        for (int i = 0; i <= 8; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);


        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("工单号");
        cell.setCellStyle(style);
        cell = row.createCell((short) 1);
        cell.setCellValue("电机编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("电机名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("申请厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("维修内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("检修班组");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("负责人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("工单状态");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("下一状态");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(map.get("ORDERID") == null ? "" : map.get("ORDERID").toString());

                row.createCell((short) 1).setCellValue(map.get("DJ_UQ_CODE") == null ? "" : map.get("DJ_UQ_CODE").toString());

                row.createCell((short) 2).setCellValue(map.get("DJ_NAME") == null ? "" : map.get("DJ_NAME").toString());

                row.createCell((short) 3).setCellValue(map.get("APPLYPLANTNAME") == null ? "" : map.get("APPLYPLANTNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("MEND_CONTEXT") == null ? "" : map.get("MEND_CONTEXT").toString());

                row.createCell((short) 5).setCellValue(map.get("MENDDEPT_NAME") == null ? "" : map.get("MENDDEPT_NAME").toString());

                row.createCell((short) 6).setCellValue(map.get("MEND_USERNAME") == null ? "" : map.get("MEND_USERNAME").toString());

                row.createCell((short) 7).setCellValue(map.get("ORDER_STATUS1") == null ? "" : map.get("ORDER_STATUS1").toString());

                row.createCell((short) 8).setCellValue(map.get("NEXT_STATUS") == null ? "" : map.get("NEXT_STATUS").toString());
                row.setRowStyle(style);

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("工单浏览.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
                response.reset();
                response.setHeader("Content-Disposition", "attachment; filename=" + fileName);

                OutputStream out = response.getOutputStream();
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

}
