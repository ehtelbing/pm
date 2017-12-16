package org.building.pm.controller;

import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.DJService;
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
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.*;

/**
 * Created by admin on 2017/10/31.
 */
@Controller
@RequestMapping("/app/pm/DJ")
public class DJController {
    @Autowired
    private DJService djService;

    @RequestMapping(value = "/pro_dj101_selectmendcontext", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj101_selectmendcontext()
            throws SQLException {
        Map result = djService.pro_dj101_selectmendcontext();
        return result;
    }

    @RequestMapping(value = "/pro_dj101_addmendcontext", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj101_addmendcontext(@RequestParam(value = "contenr_code_in") String contenr_code_in,
                                                        @RequestParam(value = "describe_in") String describe_in,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj101_addmendcontext(contenr_code_in, describe_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj101_stopmendcontext", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj101_stopmendcontext(@RequestParam(value = "contenr_code_in") String contenr_code_in,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj101_stopmendcontext(contenr_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj101_startmendcontext", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj101_startmendcontext(@RequestParam(value = "contenr_code_in") String contenr_code_in,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj101_startmendcontext(contenr_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj101_deletemendcontext", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj101_deletemendcontext(@RequestParam(value = "contenr_code_in") String contenr_code_in,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj101_deletemendcontext(contenr_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj102_selectmendtype", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj102_selectmendtype()
            throws SQLException {
        Map result = djService.pro_dj102_selectmendtype();
        return result;
    }

    @RequestMapping(value = "/pro_dj102_addmendtype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj102_addmendtype(@RequestParam(value = "type_code_in") String type_code_in,
                                                     @RequestParam(value = "describe_in") String describe_in,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj102_addmendtype(type_code_in, describe_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj102_stopmendtype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj102_stopmendtype(@RequestParam(value = "type_code_in") String type_code_in,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj102_stopmendtype(type_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj102_startmendtype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj102_startmendtype(@RequestParam(value = "type_code_in") String type_code_in,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj102_startmendtype(type_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj102_deletemendtype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj102_deletemendtype(@RequestParam(value = "type_code_in") String type_code_in,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj102_deletemendtype(type_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj103_selectgstype", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj103_selectgstype()
            throws SQLException {
        Map result = djService.pro_dj103_selectgstype();
        return result;
    }

    @RequestMapping(value = "/pro_dj103_addgstype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj103_addgstype(@RequestParam(value = "type_code_in") String type_code_in,
                                                   @RequestParam(value = "describe_in") String describe_in,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj103_addgstype(type_code_in, describe_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj103_stopgstype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj103_stopgstype(@RequestParam(value = "type_code_in") String type_code_in,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj103_stopgstype(type_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj103_startgstype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj103_startgstype(@RequestParam(value = "type_code_in") String type_code_in,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj103_startgstype(type_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj103_deletegstype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj103_deletegstype(@RequestParam(value = "type_code_in") String type_code_in,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj103_deletegstype(type_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj104_selectmoneyclass", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj104_selectmoneyclass()
            throws SQLException {
        Map result = djService.pro_dj104_selectmoneyclass();
        return result;
    }

    @RequestMapping(value = "/pro_dj104_addmoneyclass", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj104_addmoneyclass(@RequestParam(value = "type_code_in") String type_code_in,
                                                       @RequestParam(value = "describe_in") String describe_in,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj104_addmoneyclass(type_code_in, describe_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj104_stopmoneyclass", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj104_stopmoneyclass(@RequestParam(value = "type_code_in") String type_code_in,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj104_stopmoneyclass(type_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj104_startmoneyclass", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj104_startmoneyclass(@RequestParam(value = "type_code_in") String type_code_in,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj104_startmoneyclass(type_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj104_deletemoneyclass", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj104_deletemoneyclass(@RequestParam(value = "type_code_in") String type_code_in,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj104_deletemoneyclass(type_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj104_moneyclass_able", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj104_moneyclass_able()
            throws SQLException {
        Map result = djService.pro_dj104_moneyclass_able();
        return result;
    }

    @RequestMapping(value = "/pro_dj105_selectmoneytype", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj105_selectmoneytype()
            throws SQLException {
        Map result = djService.pro_dj105_selectmoneytype();
        return result;
    }

    @RequestMapping(value = "/pro_dj105_addmoneytype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj105_addmoneytype(@RequestParam(value = "type_code_in") String type_code_in,
                                                      @RequestParam(value = "describe_in") String describe_in,
                                                      @RequestParam(value = "class_code_in") String class_code_in,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj105_addmoneytype(type_code_in, describe_in, class_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj105_stopmoneytype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj105_stopmoneytype(@RequestParam(value = "type_code_in") String type_code_in,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj105_stopmoneytype(type_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj105_startmoneytype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj105_startmoneytype(@RequestParam(value = "type_code_in") String type_code_in,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj105_startmoneytype(type_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj105_deletemoneytype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj105_deletemoneytype(@RequestParam(value = "type_code_in") String type_code_in,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj105_deletemoneytype(type_code_in);
        return result;
    }


    @RequestMapping(value = "/pro_dj106_selectdjseries", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj106_selectdjseries()
            throws SQLException {
        Map result = djService.pro_dj106_selectdjseries();
        return result;
    }

    @RequestMapping(value = "/pro_dj106_adddjseries", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj106_adddjseries(@RequestParam(value = "series_type_in") String series_type_in,
                                                     @RequestParam(value = "describe_in") String describe_in,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj106_adddjseries(series_type_in, describe_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj106_stopdjseries", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj106_stopdjseries(@RequestParam(value = "series_class_in") String series_class_in,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj106_stopdjseries(series_class_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj106_startdjseries", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj106_startdjseries(@RequestParam(value = "series_class_in") String series_class_in,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj106_startdjseries(series_class_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj106_deletedjseries", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj106_deletedjseries(@RequestParam(value = "series_class_in") String series_class_in,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj106_deletedjseries(series_class_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj106_djseries_able", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj106_djseries_able()
            throws SQLException {
        Map result = djService.pro_dj106_djseries_able();
        return result;
    }

    @RequestMapping(value = "/pro_dj107_selectdjtype", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj107_selectdjtype(@RequestParam(value = "series_class_in") String series_class_in)
            throws SQLException {
        Map result = djService.pro_dj107_selectdjtype(series_class_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj107_adddjtype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj107_adddjtype(@RequestParam(value = "dj_type_in") String dj_type_in,
                                                   @RequestParam(value = "describe_in") String describe_in,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj107_adddjtype(dj_type_in, describe_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj107_stopdjtype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj107_stopdjtype(@RequestParam(value = "dj_type_in") String dj_type_in,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj107_stopdjtype(dj_type_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj107_startdjtype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj107_startdjtype(@RequestParam(value = "dj_type_in") String dj_type_in,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj107_startdjtype(dj_type_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj107_deletedjtype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj107_deletedjtype(@RequestParam(value = "dj_type_in") String dj_type_in,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj107_deletedjtype(dj_type_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj108_selectbyqseries", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj108_selectbyqseries()
            throws SQLException {
        Map result = djService.pro_dj108_selectbyqseries();
        return result;
    }

    @RequestMapping(value = "/pro_dj108_addbyqseries", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj108_addbyqseries(@RequestParam(value = "dj_type_in") String dj_type_in,
                                                      @RequestParam(value = "describe_in") String describe_in,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj108_addbyqseries(dj_type_in, describe_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj108_stopbyqseries", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj108_stopbyqseries(@RequestParam(value = "byq_series_class_in") String byq_series_class_in,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj108_stopbyqseries(byq_series_class_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj108_startbyqseries", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj108_startbyqseries(@RequestParam(value = "byq_series_class_in") String byq_series_class_in,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj108_startbyqseries(byq_series_class_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj108_deletebyqseries", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj108_deletebyqseries(@RequestParam(value = "byq_series_class_in") String byq_series_class_in,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj108_deletebyqseries(byq_series_class_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj108_byqseries_able", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj108_byqseries_able()
            throws SQLException {
        Map result = djService.pro_dj108_byqseries_able();
        return result;
    }

    @RequestMapping(value = "/pro_dj109_selectbyqtype", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj109_selectbyqtype(@RequestParam(value = "series_class_in") String series_class_in)
            throws SQLException {
        Map result = djService.pro_dj109_selectbyqtype(series_class_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj109_addbyqtype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj109_addbyqtype(@RequestParam(value = "BYQ_type_in") String BYQ_type_in,
                                                    @RequestParam(value = "describe_in") String describe_in,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj109_addbyqtype(BYQ_type_in, describe_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj109_stopbyqtype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj109_stopbyqtype(@RequestParam(value = "byq_type_in") String byq_type_in,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj109_stopbyqtype(byq_type_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj109_startbyqtype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj109_startbyqtype(@RequestParam(value = "byq_type_in") String byq_type_in,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj109_startbyqtype(byq_type_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj109_deletebyqtype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj109_deletebyqtype(@RequestParam(value = "byq_type_in") String byq_type_in,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj109_deletebyqtype(byq_type_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj102_mendtype_able", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj102_mendtype_able()
            throws SQLException {
        Map result = djService.pro_dj102_mendtype_able();
        return result;
    }

    @RequestMapping(value = "/pro_dj109_byqtype_able", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj109_byqtype_able(@RequestParam(value = "byq_type_in") String byq_type_in,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj109_byqtype_able(byq_type_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj110_selectbyqmendprice", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj110_selectbyqmendprice(@RequestParam(value = "byq_series_in") String byq_series_in,
                                                            @RequestParam(value = "byq_series_in") String byq_type_in,
                                                            @RequestParam(value = "byq_series_in") String mendtype_in,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj110_selectbyqmendprice(byq_series_in, byq_type_in, mendtype_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj110_addbyqmendprice", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj110_addbyqmendprice(@RequestParam(value = "BYQ_SERIES_in") String BYQ_SERIES_in,
                                                         @RequestParam(value = "BYQ_TYPE_in") String BYQ_TYPE_in,
                                                         @RequestParam(value = "MENDTYPE_in") String MENDTYPE_in,
                                                         @RequestParam(value = "BYQ_VOL_in") String BYQ_VOL_in,
                                                         @RequestParam(value = "BYQ_XS_in") String BYQ_XS_in,
                                                         @RequestParam(value = "BYQ_V_in") String BYQ_V_in,
                                                         @RequestParam(value = "F_PRICE_in") String F_PRICE_in,
                                                         @RequestParam(value = "REMARK_in") String REMARK_in,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj110_addbyqmendprice(BYQ_SERIES_in, BYQ_TYPE_in, MENDTYPE_in, BYQ_VOL_in, BYQ_XS_in,
                BYQ_V_in, F_PRICE_in, REMARK_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj110_deletebyqmendprice", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj110_deletebyqmendprice(@RequestParam(value = "id_in") String id_in,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj110_deletebyqmendprice(id_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj110_updatebyqmendprice", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj110_updatebyqmendprice(@RequestParam(value = "ID_in") String ID_in,
                                                            @RequestParam(value = "BYQ_SERIES_in") String BYQ_SERIES_in,
                                                            @RequestParam(value = "BYQ_TYPE_in") String BYQ_TYPE_in,
                                                            @RequestParam(value = "MENDTYPE_in") String MENDTYPE_in,
                                                            @RequestParam(value = "BYQ_VOL_in") String BYQ_VOL_in,
                                                            @RequestParam(value = "BYQ_XS_in") String BYQ_XS_in,
                                                            @RequestParam(value = "BYQ_V_in") String BYQ_V_in,
                                                            @RequestParam(value = "F_PRICE_in") String F_PRICE_in,
                                                            @RequestParam(value = "REMARK_in") String REMARK_in,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj110_updatebyqmendprice(ID_in, BYQ_SERIES_in, BYQ_TYPE_in, MENDTYPE_in, BYQ_VOL_in, BYQ_XS_in,
                BYQ_V_in, F_PRICE_in, REMARK_in);
        return result;
    }

    /*DJ110EXCEL*/
    @RequestMapping(value = "/DJ110EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void DJ110EXCEL(
            @RequestParam(value = "byq_series_in") String byq_series_in,
            @RequestParam(value = "byq_type_in") String byq_type_in,
            @RequestParam(value = "mendtype_in") String mendtype_in,
            HttpServletResponse response)
            throws
            //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        //V_V_SG_NAME = new String(V_V_SG_NAME.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = djService.pro_dj110_selectbyqmendprice(byq_series_in.equals("0") ? "%" : byq_series_in, byq_type_in, mendtype_in.equals("0") ? "%" : mendtype_in);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("型号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("容量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("相数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("电压");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("修理类别");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("结算价格");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("备注");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("系列分类");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("BYQ_TYPE") == null ? "" : map.get("BYQ_TYPE").toString());

                row.createCell((short) 2).setCellValue(map.get("BYQ_VOL") == null ? "" : map.get("BYQ_VOL").toString());

                row.createCell((short) 3).setCellValue(map.get("BYQ_XS") == null ? "" : map.get("BYQ_XS").toString());

                row.createCell((short) 4).setCellValue(map.get("BYQ_V") == null ? "" : map.get("BYQ_V").toString());

                row.createCell((short) 5).setCellValue(map.get("MENDTYPE_DESC") == null ? "" : map.get("MENDTYPE_DESC").toString());

                row.createCell((short) 6).setCellValue(map.get("F_PRICE") == null ? "" : map.get("F_PRICE").toString());

                row.createCell((short) 7).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());

                row.createCell((short) 8).setCellValue(map.get("BYQ_SERIES_CLASS_DESC") == null ? "" : map.get("BYQ_SERIES_CLASS_DESC").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("变压器修理价格.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/pro_dj101_mendcontext_able", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj101_mendcontext_able()
            throws SQLException {
        Map result = djService.pro_dj101_mendcontext_able();
        return result;
    }

    @RequestMapping(value = "/pro_dj107_djtype_able", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj107_djtype_able(@RequestParam(value = "dj_type_in") String dj_type_in,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj107_djtype_able(dj_type_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj111_selectdjmendprice_m", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj111_selectdjmendprice_m(@RequestParam(value = "series_class_in") String series_class_in,
                                                             @RequestParam(value = "dj_type_in") String dj_type_in,
                                                             @RequestParam(value = "mendcontext_code_in") String mendcontext_code_in,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj111_selectdjmendprice_m(series_class_in, dj_type_in, mendcontext_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj111_adddjmendprice_m", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj111_adddjmendprice_m(@RequestParam(value = "DJ_TYPE_in") String DJ_TYPE_in,
                                                          @RequestParam(value = "DJ_VOL_in") String DJ_VOL_in,
                                                          @RequestParam(value = "MENDCONTEXT_CODE_in") String MENDCONTEXT_CODE_in,
                                                          @RequestParam(value = "F_PRICE_in") String F_PRICE_in,
                                                          @RequestParam(value = "REMARK_in") String REMARK_in,
                                                          @RequestParam(value = "SERIES_CLASS_in") String SERIES_CLASS_in,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj111_adddjmendprice_m(DJ_TYPE_in, DJ_VOL_in, MENDCONTEXT_CODE_in, F_PRICE_in, REMARK_in, SERIES_CLASS_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj111_deletedjmendprice_m", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj111_deletedjmendprice_m(@RequestParam(value = "id_in") String id_in,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj111_deletedjmendprice_m(id_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj111_updatebyqmendprice_m", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj111_updatebyqmendprice_m(@RequestParam(value = "ID_in") String ID_in,
                                                              @RequestParam(value = "DJ_TYPE_in") String DJ_TYPE_in,
                                                              @RequestParam(value = "DJ_VOL_in") String DJ_VOL_in,
                                                              @RequestParam(value = "MENDCONTEXT_CODE_in") String MENDCONTEXT_CODE_in,
                                                              @RequestParam(value = "F_PRICE_in") String F_PRICE_in,
                                                              @RequestParam(value = "REMARK_in") String REMARK_in,
                                                              @RequestParam(value = "SERIES_CLASS_in") String SERIES_CLASS_in,
                                                              HttpServletRequest request,
                                                              HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj111_updatebyqmendprice_m(ID_in, DJ_TYPE_in, DJ_VOL_in, MENDCONTEXT_CODE_in, F_PRICE_in, REMARK_in, SERIES_CLASS_in);
        return result;
    }


    /*DJ111EXCEL*/
    @RequestMapping(value = "/DJ111EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void DJ111EXCEL(
            @RequestParam(value = "series_class_in") String series_class_in,
            @RequestParam(value = "dj_type_in") String dj_type_in,
            @RequestParam(value = "mendcontext_code_in") String mendcontext_code_in,
            HttpServletResponse response)
            throws
            //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        //V_V_SG_NAME = new String(V_V_SG_NAME.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = djService.pro_dj111_selectdjmendprice_m(series_class_in.equals("0") ? "%" : series_class_in, dj_type_in, mendcontext_code_in.equals("0") ? "%" : mendcontext_code_in);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("型号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("容量范围");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("修理内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("结算价格");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("备注");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("系列分类");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("DJ_TYPE") == null ? "" : map.get("DJ_TYPE").toString());

                row.createCell((short) 2).setCellValue(map.get("DJ_VOL") == null ? "" : map.get("DJ_VOL").toString());

                row.createCell((short) 3).setCellValue(map.get("MENDCONTEXT_DESC") == null ? "" : map.get("MENDCONTEXT_DESC").toString());

                row.createCell((short) 4).setCellValue(map.get("F_PRICE") == null ? "" : map.get("F_PRICE").toString());

                row.createCell((short) 5).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());

                row.createCell((short) 6).setCellValue(map.get("SERIES_CLASS_DESC") == null ? "" : map.get("SERIES_CLASS_DESC").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("电机（机械部分）修理价格管理.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/pro_dj112_selectdjmendprice_jx", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj112_selectdjmendprice_jx(@RequestParam(value = "series_class_in") String series_class_in,
                                                              @RequestParam(value = "dj_type_in") String dj_type_in,
                                                              @RequestParam(value = "mendtype_in") String mendtype_in,
                                                              HttpServletRequest request,
                                                              HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj112_selectdjmendprice_jx(series_class_in, dj_type_in, mendtype_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj112_adddjmendprice_jx", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj112_adddjmendprice_jx(@RequestParam(value = "DJ_TYPE_in") String DJ_TYPE_in,
                                                           @RequestParam(value = "MENDTYPE_in") String MENDTYPE_in,
                                                           @RequestParam(value = "F_PRICE_in") String F_PRICE_in,
                                                           @RequestParam(value = "DJ_VOL_in") String DJ_VOL_in,
                                                           @RequestParam(value = "DJ_SX_in") String DJ_SX_in,
                                                           @RequestParam(value = "DJ_CS_in") String DJ_CS_in,
                                                           @RequestParam(value = "DJ_DZ_CS_in") String DJ_DZ_CS_in,
                                                           @RequestParam(value = "DJ_ZZ_CS_in") String DJ_ZZ_CS_in,
                                                           @RequestParam(value = "SERIES_CLASS_in") String SERIES_CLASS_in,
                                                           @RequestParam(value = "REMARK_in") String REMARK_in,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj112_adddjmendprice_jx(DJ_TYPE_in, MENDTYPE_in, F_PRICE_in, DJ_VOL_in, DJ_SX_in,
                DJ_CS_in, DJ_DZ_CS_in, DJ_ZZ_CS_in, SERIES_CLASS_in, REMARK_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj112_deletedjmendprice_jx", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj112_deletedjmendprice_jx(@RequestParam(value = "id_in") String id_in,
                                                              HttpServletRequest request,
                                                              HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj112_deletedjmendprice_jx(id_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj112_updatedjmendprice_jx", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj112_updatedjmendprice_jx(@RequestParam(value = "ID_in") String ID_in,
                                                              @RequestParam(value = "DJ_TYPE_in") String DJ_TYPE_in,
                                                              @RequestParam(value = "MENDTYPE_in") String MENDTYPE_in,
                                                              @RequestParam(value = "F_PRICE_in") String F_PRICE_in,
                                                              @RequestParam(value = "DJ_VOL_in") String DJ_VOL_in,
                                                              @RequestParam(value = "DJ_SX_in") String DJ_SX_in,
                                                              @RequestParam(value = "DJ_CS_in") String DJ_CS_in,
                                                              @RequestParam(value = "DJ_DZ_CS_in") String DJ_DZ_CS_in,
                                                              @RequestParam(value = "DJ_ZZ_CS_in") String DJ_ZZ_CS_in,
                                                              @RequestParam(value = "SERIES_CLASS_in") String SERIES_CLASS_in,
                                                              @RequestParam(value = "REMARK_in") String REMARK_in,
                                                              HttpServletRequest request,
                                                              HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj112_updatedjmendprice_jx(ID_in, DJ_TYPE_in, MENDTYPE_in, F_PRICE_in, DJ_VOL_in, DJ_SX_in,
                DJ_CS_in, DJ_DZ_CS_in, DJ_ZZ_CS_in, SERIES_CLASS_in, REMARK_in);
        return result;
    }

    /*DJ112EXCEL*/
    @RequestMapping(value = "/DJ112EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void DJ112EXCEL(
            @RequestParam(value = "series_class_in") String series_class_in,
            @RequestParam(value = "dj_type_in") String dj_type_in,
            @RequestParam(value = "mendtype_in") String mendtype_in,
            HttpServletResponse response)
            throws
            //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        //V_V_SG_NAME = new String(V_V_SG_NAME.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = djService.pro_dj112_selectdjmendprice_jx(series_class_in.equals("0") ? "%" : series_class_in, dj_type_in, mendtype_in.equals("0") ? "%" : mendtype_in);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("型号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("修理类别");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("结算价格");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("容量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("相数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("槽书");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("定子槽书");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("转子槽书");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("系列分类");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("备注");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("DJ_TYPE") == null ? "" : map.get("DJ_TYPE").toString());

                row.createCell((short) 2).setCellValue(map.get("MENDTYPE_DESC") == null ? "" : map.get("MENDTYPE_DESC").toString());

                row.createCell((short) 3).setCellValue(map.get("F_PRICE") == null ? "" : map.get("F_PRICE").toString());

                row.createCell((short) 4).setCellValue(map.get("DJ_VOL") == null ? "" : map.get("DJ_VOL").toString());

                row.createCell((short) 5).setCellValue(map.get("DJ_SX") == null ? "" : map.get("DJ_SX").toString());

                row.createCell((short) 6).setCellValue(map.get("DJ_CS") == null ? "" : map.get("DJ_CS").toString());

                row.createCell((short) 7).setCellValue(map.get("DJ_DZ_CS") == null ? "" : map.get("DJ_DZ_CS").toString());

                row.createCell((short) 8).setCellValue(map.get("DJ_ZZ_CS") == null ? "" : map.get("DJ_ZZ_CS").toString());

                row.createCell((short) 9).setCellValue(map.get("SERIES_CLASS_DESC") == null ? "" : map.get("SERIES_CLASS_DESC").toString());

                row.createCell((short) 10).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("电机（卷线部分）修理价格管理.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/pro_dj105_moneytype_able", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj105_moneytype_able(
            @RequestParam(value = "money_class_in") String money_class_in)
            throws SQLException {
        Map result = djService.pro_dj105_moneytype_able(money_class_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj113_selectdjmendprice_p", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj113_selectdjmendprice_p(@RequestParam(value = "money_type_in") String money_type_in,
                                                             @RequestParam(value = "projtype_desc_in") String projtype_desc_in,
                                                             @RequestParam(value = "mendtype_in") String mendtype_in,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj113_selectdjmendprice_p(money_type_in, projtype_desc_in, mendtype_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj113_adddjmendprice_p", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj113_adddjmendprice_p(@RequestParam(value = "PROJTYPE_DESC_id") String PROJTYPE_DESC_id,
                                                          @RequestParam(value = "REMARK_in") String REMARK_in,
                                                          @RequestParam(value = "MONEY_TYPE_in") String MONEY_TYPE_in,
                                                          @RequestParam(value = "F_PRICE_in") String F_PRICE_in,
                                                          @RequestParam(value = "MENDTYPE_in") String MENDTYPE_in,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj113_adddjmendprice_p(PROJTYPE_DESC_id, REMARK_in, MONEY_TYPE_in, F_PRICE_in, MENDTYPE_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj113_deletedjmendprice_p", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj113_deletedjmendprice_p(@RequestParam(value = "projtype_id_in") String projtype_id_in,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj113_deletedjmendprice_p(projtype_id_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj113_updatedjmendprice_p", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj113_updatedjmendprice_p(@RequestParam(value = "PROJTYPE_ID_in") String PROJTYPE_ID_in,
                                                             @RequestParam(value = "PROJTYPE_DESC_in") String PROJTYPE_DESC_in,
                                                             @RequestParam(value = "REMARK_in") String REMARK_in,
                                                             @RequestParam(value = "MONEY_TYPE_in") String MONEY_TYPE_in,
                                                             @RequestParam(value = "F_PRICE_in") String F_PRICE_in,
                                                             @RequestParam(value = "MENDTYPE_in") String MENDTYPE_in,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj113_updatedjmendprice_p(PROJTYPE_ID_in, PROJTYPE_DESC_in, REMARK_in, MONEY_TYPE_in, F_PRICE_in, MENDTYPE_in);
        return result;
    }

    /*DJ113EXCEL*/
    @RequestMapping(value = "/DJ113EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void DJ113EXCEL(
            @RequestParam(value = "money_type_in") String money_type_in,
            @RequestParam(value = "projtype_desc_in") String projtype_desc_in,
            @RequestParam(value = "mendtype_in") String mendtype_in,
            HttpServletResponse response)
            throws
            //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        //V_V_SG_NAME = new String(V_V_SG_NAME.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = djService.pro_dj113_selectdjmendprice_p(money_type_in.equals("0") ? "%" : money_type_in, projtype_desc_in, mendtype_in.equals("0") ? "%" : mendtype_in);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("工程类型名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("修理类别");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("费用类别");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("价格");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("备注");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("PROJTYPE_DESC") == null ? "" : map.get("PROJTYPE_DESC").toString());

                row.createCell((short) 2).setCellValue(map.get("MENDTYPE_DESC") == null ? "" : map.get("MENDTYPE_DESC").toString());

                row.createCell((short) 3).setCellValue(map.get("MONEY_TYPE_DESC") == null ? "" : map.get("MONEY_TYPE_DESC").toString());

                row.createCell((short) 4).setCellValue(map.get("F_PRICE") == null ? "" : map.get("F_PRICE").toString());

                row.createCell((short) 5).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("工程维修价格表管理.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/pro_dj103_gstype_able", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj103_gstype_able()
            throws SQLException {
        Map result = djService.pro_dj103_gstype_able();
        return result;
    }

    @RequestMapping(value = "/pro_dj115_setclass_able", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj115_setclass_able()
            throws SQLException {
        Map result = djService.pro_dj115_setclass_able();
        return result;
    }

    @RequestMapping(value = "/pro_dj114_selectdjdingecost", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj114_selectdjdingecost(@RequestParam(value = "money_type_in") String money_type_in,
                                                           @RequestParam(value = "mendtype_in") String mendtype_in,
                                                           @RequestParam(value = "gs_type_in") String gs_type_in,
                                                           @RequestParam(value = "set_id_in") String set_id_in,
                                                           @RequestParam(value = "series_class_in") String series_class_in,
                                                           @RequestParam(value = "dj_type_in") String dj_type_in,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj114_selectdjdingecost(money_type_in, mendtype_in, gs_type_in, set_id_in, series_class_in, dj_type_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj114_adddjdingecost", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj114_adddjdingecost(@RequestParam(value = "DJ_TYPE_CODE_in") String DJ_TYPE_CODE_in,
                                                        @RequestParam(value = "DJ_TYPE_in") String DJ_TYPE_in,
                                                        @RequestParam(value = "DJ_VOL_in") String DJ_VOL_in,
                                                        @RequestParam(value = "DJ_V_in") String DJ_V_in,
                                                        @RequestParam(value = "DJ_CS_in") String DJ_CS_in,

                                                        @RequestParam(value = "DJ_DXTYPE_in") String DJ_DXTYPE_in,
                                                        @RequestParam(value = "DJ_WEIGHT_in") String DJ_WEIGHT_in,
                                                        @RequestParam(value = "MENDTYPE_in") String MENDTYPE_in,
                                                        @RequestParam(value = "GS_TYPE_in") String GS_TYPE_in,
                                                        @RequestParam(value = "GS_PRICE_in") String GS_PRICE_in,

                                                        @RequestParam(value = "MONEY_TYPE_in") String MONEY_TYPE_in,
                                                        @RequestParam(value = "MOENY_PRICE_in") String MOENY_PRICE_in,
                                                        @RequestParam(value = "SERIES_CLASS_in") String SERIES_CLASS_in,
                                                        @RequestParam(value = "SET_ID_in") String SET_ID_in,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj114_adddjdingecost(DJ_TYPE_CODE_in, DJ_TYPE_in, DJ_VOL_in, DJ_V_in, DJ_CS_in,
                DJ_DXTYPE_in, DJ_WEIGHT_in, MENDTYPE_in, GS_TYPE_in, GS_PRICE_in,
                MONEY_TYPE_in, MOENY_PRICE_in, SERIES_CLASS_in, SET_ID_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj114_deletedingecost", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj114_deletedingecost(@RequestParam(value = "id_in") String id_in,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj114_deletedingecost(id_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj114_updatedjdingecost", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj114_updatedjdingecost(@RequestParam(value = "ID_in") String ID_in,
                                                           @RequestParam(value = "DJ_TYPE_CODE_in") String DJ_TYPE_CODE_in,
                                                           @RequestParam(value = "DJ_TYPE_in") String DJ_TYPE_in,
                                                           @RequestParam(value = "DJ_VOL_in") String DJ_VOL_in,
                                                           @RequestParam(value = "DJ_V_in") String DJ_V_in,
                                                           @RequestParam(value = "DJ_CS_in") String DJ_CS_in,

                                                           @RequestParam(value = "DJ_DXTYPE_in") String DJ_DXTYPE_in,
                                                           @RequestParam(value = "DJ_WEIGHT_in") String DJ_WEIGHT_in,
                                                           @RequestParam(value = "MENDTYPE_in") String MENDTYPE_in,
                                                           @RequestParam(value = "GS_TYPE_in") String GS_TYPE_in,
                                                           @RequestParam(value = "GS_PRICE_in") String GS_PRICE_in,

                                                           @RequestParam(value = "MONEY_TYPE_in") String MONEY_TYPE_in,
                                                           @RequestParam(value = "MOENY_PRICE_in") String MOENY_PRICE_in,
                                                           @RequestParam(value = "SERIES_CLASS_in") String SERIES_CLASS_in,
                                                           @RequestParam(value = "SET_ID_in") String SET_ID_in,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj114_updatedjdingecost(ID_in, DJ_TYPE_CODE_in, DJ_TYPE_in, DJ_VOL_in, DJ_V_in, DJ_CS_in,
                DJ_DXTYPE_in, DJ_WEIGHT_in, MENDTYPE_in, GS_TYPE_in, GS_PRICE_in,
                MONEY_TYPE_in, MOENY_PRICE_in, SERIES_CLASS_in, SET_ID_in);
        return result;
    }

    /*DJ114EXCEL*/
    @RequestMapping(value = "/DJ114EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void DJ114EXCEL(
            @RequestParam(value = "money_type_in") String money_type_in,
            @RequestParam(value = "mendtype_in") String mendtype_in,
            @RequestParam(value = "gs_type_in") String gs_type_in,
            @RequestParam(value = "set_id_in") String set_id_in,
            @RequestParam(value = "series_class_in") String series_class_in,
            @RequestParam(value = "dj_type_in") String dj_type_in,
            HttpServletResponse response)
            throws
            //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        //V_V_SG_NAME = new String(V_V_SG_NAME.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = djService.pro_dj114_selectdjdingecost(money_type_in.equals("0") ? "%" : money_type_in,
                mendtype_in.equals("0") ? "%" : mendtype_in,
                gs_type_in.equals("0") ? "%" : gs_type_in,
                set_id_in.equals("0") ? "%" : set_id_in,
                series_class_in.equals("0") ? "%" : series_class_in,
                dj_type_in
        );

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("电机型号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("容量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("电压");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("槽数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("导线规格");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("重量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("组件类型");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("修理类别");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("工时定额分类");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("工时价格");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("费用分类");
        cell.setCellStyle(style);

        cell = row.createCell((short) 13);
        cell.setCellValue("费用价格");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("DJ_TYPE") == null ? "" : map.get("DJ_TYPE").toString());

                row.createCell((short) 2).setCellValue(map.get("DJ_TYPE_CODE") == null ? "" : map.get("DJ_TYPE_CODE").toString());

                row.createCell((short) 3).setCellValue(map.get("DJ_VOL") == null ? "" : map.get("DJ_VOL").toString());

                row.createCell((short) 4).setCellValue(map.get("DJ_V") == null ? "" : map.get("DJ_V").toString());

                row.createCell((short) 5).setCellValue(map.get("DJ_CS") == null ? "" : map.get("DJ_CS").toString());

                row.createCell((short) 6).setCellValue(map.get("DJ_DXTYPE") == null ? "" : map.get("DJ_DXTYPE").toString());

                row.createCell((short) 7).setCellValue(map.get("DJ_WEIGHT") == null ? "" : map.get("DJ_WEIGHT").toString());

                row.createCell((short) 8).setCellValue(map.get("SET_DESC") == null ? "" : map.get("SET_DESC").toString());

                row.createCell((short) 9).setCellValue(map.get("MENDTYPE_DESC") == null ? "" : map.get("MENDTYPE_DESC").toString());

                row.createCell((short) 10).setCellValue(map.get("GS_TYPE_DESC") == null ? "" : map.get("GS_TYPE_DESC").toString());

                row.createCell((short) 11).setCellValue(map.get("GS_PRICE") == null ? "" : map.get("GS_PRICE").toString());

                row.createCell((short) 12).setCellValue(map.get("MONEY_TYPE_DESC") == null ? "" : map.get("MONEY_TYPE_DESC").toString());

                row.createCell((short) 13).setCellValue(map.get("MOENY_PRICE") == null ? "" : map.get("MOENY_PRICE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("电机修理定额成本表管理.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/pro_dj115_selectsetclass", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj115_selectsetclass()
            throws SQLException {
        Map result = djService.pro_dj115_selectsetclass();
        return result;
    }

    @RequestMapping(value = "/pro_dj115_addsetclass", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj115_addsetclass(@RequestParam(value = "SET_ID_in") String SET_ID_in,
                                                     @RequestParam(value = "SET_DESC_in") String SET_DESC_in,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj115_addsetclass(SET_ID_in, SET_DESC_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj115_deletesetclass", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj115_deletesetclass(@RequestParam(value = "set_id_in") String set_id_in,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj115_deletesetclass(set_id_in);
        return result;
    }


    @RequestMapping(value = "/pro_dj115_startsetclass", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj115_startsetclass(@RequestParam(value = "set_status_in") String set_status_in,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj115_startsetclass(set_status_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj115_stopsetclass", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj115_stopsetclass(@RequestParam(value = "set_status_in") String set_status_in,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj115_stopsetclass(set_status_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj201_workstatus", method = RequestMethod.POST)
    @ResponseBody
    public Map pro_dj201_workstatus()
            throws SQLException {
        Map result = djService.pro_dj201_workstatus();
        return result;
    }

    @RequestMapping(value = "/pro_dj201_djmainlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj201_djmainlist(@RequestParam(value = "plantcode_in") String plantcode_in,
                                                    @RequestParam(value = "departcode_in") String departcode_in,
                                                    @RequestParam(value = "dj_series_class_in") String dj_series_class_in,
                                                    @RequestParam(value = "loc_plantcode_in") String loc_plantcode_in,
                                                    @RequestParam(value = "dj_loc_in") String dj_loc_in,
                                                    @RequestParam(value = "work_status_in") String work_status_in,
                                                    @RequestParam(value = "dj_name_in") String dj_name_in,
                                                    @RequestParam(value = "dj_unique_code_in") String dj_unique_code_in,
                                                    @RequestParam(value = "dj_code_in") String dj_code_in,
                                                    @RequestParam(value = "dj_type_in") String dj_type_in,
                                                    @RequestParam(value = "dj_vol_in") String dj_vol_in,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj201_djmainlist(plantcode_in, departcode_in,dj_series_class_in,loc_plantcode_in,  dj_loc_in, work_status_in,
                dj_name_in, dj_unique_code_in, dj_code_in,dj_type_in, dj_vol_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj201_djmaindetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj201_djmaindetail(@RequestParam(value = "dj_unique_code_in") String dj_unique_code_in,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj201_djmaindetail(dj_unique_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj201_adddjmain", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj201_adddjmain(@RequestParam(value = "DJ_UNIQUE_CODE_in") String DJ_UNIQUE_CODE_in,
                                                   @RequestParam(value = "DJ_NAME_in") String DJ_NAME_in,
                                                   @RequestParam(value = "DJ_TYPE_in") String DJ_TYPE_in,
                                                   @RequestParam(value = "DJ_SERIES_CLASS_in") String DJ_SERIES_CLASS_in,
                                                   @RequestParam(value = "DJ_VOL_in") String DJ_VOL_in,

                                                   @RequestParam(value = "DJ_V_in") String DJ_V_in,
                                                   @RequestParam(value = "DJ_CS_in") String DJ_CS_in,
                                                   @RequestParam(value = "DJ_DXTYPE_in") String DJ_DXTYPE_in,
                                                   @RequestParam(value = "DJ_WEIGHT_in") String DJ_WEIGHT_in,
                                                   @RequestParam(value = "DJ_CS_DZ_in") String DJ_CS_DZ_in,

                                                   @RequestParam(value = "DJ_CS_ZZ_in") String DJ_CS_ZZ_in,
                                                   @RequestParam(value = "WORK_STATUS_in") String WORK_STATUS_in,
                                                   @RequestParam(value = "PLANTCODE_in") String PLANTCODE_in,
                                                   @RequestParam(value = "PLANTNAME_in") String PLANTNAME_in,
                                                   @RequestParam(value = "DEPARTCODE_in") String DEPARTCODE_in,

                                                   @RequestParam(value = "DEPARTNAME_in") String DEPARTNAME_in,
                                                   @RequestParam(value = "LOC_PLANTCODE_in") String LOC_PLANTCODE_in,
                                                   @RequestParam(value = "LOC_PLANTNAME_in") String LOC_PLANTNAME_in,
                                                   @RequestParam(value = "DJ_LOC_in") String DJ_LOC_in,
                                                   @RequestParam(value = "REMARK_in") String REMARK_in,

                                                   @RequestParam(value = "INSERTDATE_in") @DateTimeFormat(pattern = "yyyy-MM-dd") Date INSERTDATE_in,
                                                   @RequestParam(value = "DZ_V_in") String DZ_V_in,
                                                   @RequestParam(value = "DZ_A_in") String DZ_A_in,
                                                   @RequestParam(value = "ZZ_V_in") String ZZ_V_in,
                                                   @RequestParam(value = "ZZ_A_in") String ZZ_A_in,

                                                   @RequestParam(value = "W_YINSHU_in") String W_YINSHU_in,
                                                   @RequestParam(value = "EDZS_in") String EDZS_in,
                                                   @RequestParam(value = "JXFS_in") String JXFS_in,
                                                   @RequestParam(value = "JYDJ_in") String JYDJ_in,
                                                   @RequestParam(value = "SUPPLY_CODE_in") String SUPPLY_CODE_in,

                                                   @RequestParam(value = "SUPPLY_NAME_in") String SUPPLY_NAME_in,
                                                   @RequestParam(value = "PRODUCE_DATE_in") @DateTimeFormat(pattern = "yyyy-MM-dd") Date PRODUCE_DATE_in,
                                                   @RequestParam(value = "USERID_IN") String USERID_IN,
                                                   @RequestParam(value = "USERNAME_IN") String USERNAME_IN,
                                                   @RequestParam(value = "djcode_in") String djcode_in,

                                                   @RequestParam(value = "bx_date_in") @DateTimeFormat(pattern = "yyyy-MM-dd") Date bx_date_in,
                                                   @RequestParam(value = "loc_departcode_in") String loc_departcode_in,
                                                   @RequestParam(value = "loc_departname_in") String loc_departname_in,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj201_adddjmain( DJ_UNIQUE_CODE_in,  DJ_NAME_in,  DJ_TYPE_in,  DJ_SERIES_CLASS_in,  DJ_VOL_in,
                 DJ_V_in,  DJ_CS_in,  DJ_DXTYPE_in,  DJ_WEIGHT_in,  DJ_CS_DZ_in,
                 DJ_CS_ZZ_in,  WORK_STATUS_in,  PLANTCODE_in,  PLANTNAME_in,  DEPARTCODE_in,
                 DEPARTNAME_in,  LOC_PLANTCODE_in,  LOC_PLANTNAME_in,  DJ_LOC_in,  REMARK_in,
                 INSERTDATE_in,  DZ_V_in,  DZ_A_in,  ZZ_V_in,  ZZ_A_in,
                 W_YINSHU_in,  EDZS_in,  JXFS_in,  JYDJ_in,  SUPPLY_CODE_in,
                 SUPPLY_NAME_in,  PRODUCE_DATE_in,  USERID_IN,  USERNAME_IN,  djcode_in,
                 bx_date_in,  loc_departcode_in,  loc_departname_in);
        return result;
    }

    /*DJ201EXCEL*/
    @RequestMapping(value = "/DJ201EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void DJ201EXCEL(
            @RequestParam(value = "plantcode_in") String plantcode_in,
            @RequestParam(value = "departcode_in") String departcode_in,
            @RequestParam(value = "dj_series_class_in") String dj_series_class_in,
            @RequestParam(value = "loc_plantcode_in") String loc_plantcode_in,
            @RequestParam(value = "dj_loc_in") String dj_loc_in,
            @RequestParam(value = "work_status_in") String work_status_in,
            @RequestParam(value = "dj_name_in") String dj_name_in,
            @RequestParam(value = "dj_unique_code_in") String dj_unique_code_in,
            @RequestParam(value = "dj_code_in") String dj_code_in,
            @RequestParam(value = "dj_type_in") String dj_type_in,
            @RequestParam(value = "dj_vol_in") String dj_vol_in,
            HttpServletResponse response)
            throws
            //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        //V_V_SG_NAME = new String(V_V_SG_NAME.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = djService.pro_dj201_djmainlist(plantcode_in.equals("0") ? "%" : plantcode_in,
                departcode_in.equals("0") ? "%" : departcode_in,
                dj_series_class_in.equals("0") ? "%" : dj_series_class_in,
                loc_plantcode_in.equals("0") ? "%" : loc_plantcode_in,
                dj_loc_in,
                work_status_in.equals("0") ? "%" : work_status_in,
                dj_name_in,
                dj_unique_code_in,
                dj_code_in,
                dj_type_in,
                dj_vol_in);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("电机唯一编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("电机名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("电机型号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("系列分类");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("容量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("所属厂矿名");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("所属部门名");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("存放单位名");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("存放位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("运行状态");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("DJ_UNIQUE_CODE") == null ? "" : map.get("DJ_UNIQUE_CODE").toString());

                row.createCell((short) 2).setCellValue(map.get("DJ_NAME") == null ? "" : map.get("DJ_NAME").toString());

                row.createCell((short) 3).setCellValue(map.get("DJ_TYPE") == null ? "" : map.get("DJ_TYPE").toString());

                row.createCell((short) 4).setCellValue(map.get("DJ_SERIES_CLASS") == null ? "" : map.get("DJ_SERIES_CLASS").toString());

                row.createCell((short) 5).setCellValue(map.get("DJ_VOL") == null ? "" : map.get("DJ_VOL").toString());

                row.createCell((short) 6).setCellValue(map.get("PLANTNAME") == null ? "" : map.get("PLANTNAME").toString());

                row.createCell((short) 7).setCellValue(map.get("DEPARTNAME") == null ? "" : map.get("DEPARTNAME").toString());

                row.createCell((short) 8).setCellValue(map.get("LOC_PLANTNAME") == null ? "" : map.get("LOC_PLANTNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("DJ_LOC") == null ? "" : map.get("DJ_LOC").toString());

                row.createCell((short) 10).setCellValue(map.get("WORK_STATUS") == null ? "" : map.get("WORK_STATUS").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("电机设备数据维护.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/pro_dj201_updateworkstatus", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj201_updateworkstatus(@RequestParam(value = "dj_unique_code_in") String dj_unique_code_in,
                                                          @RequestParam(value = "WORK_STATUS_in") String WORK_STATUS_in,
                                                          @RequestParam(value = "OP_USERID_in") String OP_USERID_in,
                                                          @RequestParam(value = "OP_USERNAME_in") String OP_USERNAME_in,
                                                          @RequestParam(value = "REMARK_in") String REMARK_in,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj201_updateworkstatus(dj_unique_code_in,WORK_STATUS_in,OP_USERID_in,OP_USERNAME_in,REMARK_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj201_djoplog", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj201_djoplog(@RequestParam(value = "dj_unique_code_in") String dj_unique_code_in,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj201_djoplog(dj_unique_code_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj201_djmendrecord", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj201_djmendrecord(@RequestParam(value = "a_dj_unique_code") String a_dj_unique_code,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj201_djmendrecord(a_dj_unique_code);
        return result;
    }

    @RequestMapping(value = "/pro_dj301_byqmainlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj301_byqmainlist(@RequestParam(value = "plantCode") String plantCode,
                                                     @RequestParam(value = "deptCode") String deptCode,
                                                     @RequestParam(value = "type_in") String type_in,
                                                     @RequestParam(value = "save_code") String save_code,
                                                     @RequestParam(value = "save_location") String save_location,
                                                     @RequestParam(value = "run_state") String run_state,
                                                     @RequestParam(value = "generator_name") String generator_name,
                                                     @RequestParam(value = "generator_code") String generator_code,
                                                     @RequestParam(value = "generator_Version") String generator_Version,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj301_byqmainlist(plantCode,deptCode,type_in,save_code,save_location,
                run_state,generator_name,generator_code,generator_Version);
        return result;
    }

    @RequestMapping(value = "/pro_dj301_updateworkstatus", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj301_updateworkstatus(@RequestParam(value = "key_code") String key_code,
                                                          @RequestParam(value = "run_state") String run_state,
                                                          @RequestParam(value = "user_code") String user_code,
                                                          @RequestParam(value = "user_name") String user_name,
                                                          @RequestParam(value = "edit_explain") String edit_explain,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj301_updateworkstatus(key_code, run_state, user_code, user_name, edit_explain);
        return result;
    }

    @RequestMapping(value = "/pro_dj301_addbyqmain", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj301_addbyqmain(@RequestParam(value = "BYQ_UNIQUE_CODE_in") String BYQ_UNIQUE_CODE_in,
                                                   @RequestParam(value = "BYQ_NAME_in") String BYQ_NAME_in,
                                                   @RequestParam(value = "SUPPLY_CODE_in") String SUPPLY_CODE_in,
                                                   @RequestParam(value = "BYQ_V_in") String BYQ_V_in,
                                                   @RequestParam(value = "QSZL_in") String QSZL_in,

                                                   @RequestParam(value = "BYQ_SERIES_in") String BYQ_SERIES_in,
                                                   @RequestParam(value = "BYQ_SERIES_NAME_in") String BYQ_SERIES_NAME_in,
                                                   @RequestParam(value = "BYQ_TYPE_in") String BYQ_TYPE_in,
                                                   @RequestParam(value = "SUPPLY_NAME_in") String SUPPLY_NAME_in,
                                                   @RequestParam(value = "BYQ_A_in") String BYQ_A_in,

                                                   @RequestParam(value = "YZ_in") String YZ_in,
                                                   @RequestParam(value = "PLANTCODE_in") String PLANTCODE_in,
                                                   @RequestParam(value = "PLANTNAME_in") String PLANTNAME_in,
                                                   @RequestParam(value = "DEPARTCODE_in") String DEPARTCODE_in,
                                                   @RequestParam(value = "DEPARTNAME_in") String DEPARTNAME_in,

                                                   @RequestParam(value = "PRODUCE_DATE_in") String PRODUCE_DATE_in,
                                                   @RequestParam(value = "LJZBH_in") String LJZBH_in,
                                                   @RequestParam(value = "ZZ_in") String ZZ_in,
                                                   @RequestParam(value = "LOC_PLANTCODE_in") String LOC_PLANTCODE_in,
                                                   @RequestParam(value = "LOC_PLANTNAME_in") String LOC_PLANTNAME_in,

                                                   @RequestParam(value = "DJ_LOC_in") String DJ_LOC_in,
                                                   @RequestParam(value = "BYQ_VOL_in") String BYQ_VOL_in,
                                                   @RequestParam(value = "ZKDY_in") String ZKDY_in,
                                                   @RequestParam(value = "KZSH_in") String KZSH_in,
                                                   @RequestParam(value = "LQFS_in") String LQFS_in,

                                                   @RequestParam(value = "SYTJ_in") String SYTJ_in,
                                                   @RequestParam(value = "DLSH_in") String DLSH_in,
                                                   @RequestParam(value = "KZDL_in") String KZDL_in,
                                                   @RequestParam(value = "WORK_STATUS_in") String WORK_STATUS_in,
                                                   @RequestParam(value = "REMARK_in") String REMARK_in,

                                                   @RequestParam(value = "USERCODE_in") String USERCODE_in,
                                                   @RequestParam(value = "USERNAME_in") String USERNAME_in,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj301_addbyqmain(BYQ_UNIQUE_CODE_in, BYQ_NAME_in, SUPPLY_CODE_in, BYQ_V_in, QSZL_in,
                BYQ_SERIES_in, BYQ_SERIES_NAME_in, BYQ_TYPE_in, SUPPLY_NAME_in, BYQ_A_in,
                YZ_in, PLANTCODE_in, PLANTNAME_in, DEPARTCODE_in,DEPARTNAME_in,
                PRODUCE_DATE_in, LJZBH_in, ZZ_in,  LOC_PLANTCODE_in, LOC_PLANTNAME_in,
                DJ_LOC_in, BYQ_VOL_in, ZKDY_in,KZSH_in, LQFS_in,
                SYTJ_in, DLSH_in,KZDL_in,  WORK_STATUS_in, REMARK_in,
                USERCODE_in, USERNAME_in);
        return result;
    }


    @RequestMapping(value = "/pro_dj301_byqoplog", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj301_byqoplog(@RequestParam(value = "key_code") String key_code,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj301_byqoplog(key_code);
        return result;
    }

    @RequestMapping(value = "/pro_dj301_byqmaindetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj301_byqmaindetail(@RequestParam(value = "key_code") String key_code,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj301_byqmaindetail(key_code);
        return result;
    }

    @RequestMapping(value = "/pro_dj301_updatebyqmain", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj301_updatebyqmain(@RequestParam(value = "BYQ_UNIQUE_CODE_in") String BYQ_UNIQUE_CODE_in,
                                                    @RequestParam(value = "BYQ_NAME_in") String BYQ_NAME_in,
                                                    @RequestParam(value = "SUPPLY_CODE_in") String SUPPLY_CODE_in,
                                                    @RequestParam(value = "BYQ_V_in") String BYQ_V_in,
                                                    @RequestParam(value = "QSZL_in") String QSZL_in,

                                                    @RequestParam(value = "BYQ_SERIES_in") String BYQ_SERIES_in,
                                                    @RequestParam(value = "BYQ_SERIES_NAME_in") String BYQ_SERIES_NAME_in,
                                                    @RequestParam(value = "BYQ_TYPE_in") String BYQ_TYPE_in,
                                                    @RequestParam(value = "SUPPLY_NAME_in") String SUPPLY_NAME_in,
                                                    @RequestParam(value = "BYQ_A_in") String BYQ_A_in,

                                                    @RequestParam(value = "YZ_in") String YZ_in,
                                                    @RequestParam(value = "PLANTCODE_in") String PLANTCODE_in,
                                                    @RequestParam(value = "PLANTNAME_in") String PLANTNAME_in,
                                                    @RequestParam(value = "DEPARTCODE_in") String DEPARTCODE_in,
                                                    @RequestParam(value = "DEPARTNAME_in") String DEPARTNAME_in,

                                                    @RequestParam(value = "PRODUCE_DATE_in") String PRODUCE_DATE_in,
                                                    @RequestParam(value = "LJZBH_in") String LJZBH_in,
                                                    @RequestParam(value = "ZZ_in") String ZZ_in,
                                                    @RequestParam(value = "LOC_PLANTCODE_in") String LOC_PLANTCODE_in,
                                                    @RequestParam(value = "LOC_PLANTNAME_in") String LOC_PLANTNAME_in,

                                                    @RequestParam(value = "DJ_LOC_in") String DJ_LOC_in,
                                                    @RequestParam(value = "BYQ_VOL_in") String BYQ_VOL_in,
                                                    @RequestParam(value = "ZKDY_in") String ZKDY_in,
                                                    @RequestParam(value = "KZSH_in") String KZSH_in,
                                                    @RequestParam(value = "LQFS_in") String LQFS_in,

                                                    @RequestParam(value = "SYTJ_in") String SYTJ_in,
                                                    @RequestParam(value = "DLSH_in") String DLSH_in,
                                                    @RequestParam(value = "KZDL_in") String KZDL_in,
                                                    @RequestParam(value = "WORK_STATUS_in") String WORK_STATUS_in,
                                                    @RequestParam(value = "REMARK_in") String REMARK_in,

                                                    @RequestParam(value = "USERCODE_in") String USERCODE_in,
                                                    @RequestParam(value = "USERNAME_in") String USERNAME_in,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj301_updatebyqmain(BYQ_UNIQUE_CODE_in, BYQ_NAME_in, SUPPLY_CODE_in, BYQ_V_in, QSZL_in,
                BYQ_SERIES_in, BYQ_SERIES_NAME_in, BYQ_TYPE_in, SUPPLY_NAME_in, BYQ_A_in,
                YZ_in, PLANTCODE_in, PLANTNAME_in, DEPARTCODE_in,DEPARTNAME_in,
                PRODUCE_DATE_in, LJZBH_in, ZZ_in,  LOC_PLANTCODE_in, LOC_PLANTNAME_in,
                DJ_LOC_in, BYQ_VOL_in, ZKDY_in,KZSH_in, LQFS_in,
                SYTJ_in, DLSH_in,KZDL_in,  WORK_STATUS_in, REMARK_in,
                USERCODE_in, USERNAME_in);
        return result;
    }

    /*DJ301EXCEL*/
    @RequestMapping(value = "/DJ301EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void DJ301EXCEL(
            @RequestParam(value = "plantCode") String plantCode,
            @RequestParam(value = "deptCode") String deptCode,
            @RequestParam(value = "type_in") String type_in,
            @RequestParam(value = "save_code") String save_code,
            @RequestParam(value = "save_location") String save_location,
            @RequestParam(value = "run_state") String run_state,
            @RequestParam(value = "generator_name") String generator_name,
            @RequestParam(value = "generator_code") String generator_code,
            @RequestParam(value = "generator_Version") String generator_Version,
            HttpServletResponse response)
            throws
            //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        //V_V_SG_NAME = new String(V_V_SG_NAME.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = djService.pro_dj301_byqmainlist(plantCode.equals("0") ? "%" : plantCode,
                deptCode.equals("0") ? "%" : deptCode,
                type_in.equals("0") ? "%" : type_in,
                save_code.equals("0") ? "%" : save_code,
                save_location,
                run_state.equals("0") ? "%" : run_state,
                generator_name,
                generator_code,
                generator_Version);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("变压器唯一编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("变压器名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("变压器型号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("系列分类");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("容量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("所属厂矿名");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("所属部门名");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("存放单位名");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("存放位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("运行状态");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("BYQ_UNIQUE_CODE") == null ? "" : map.get("BYQ_UNIQUE_CODE").toString());

                row.createCell((short) 2).setCellValue(map.get("BYQ_NAME") == null ? "" : map.get("BYQ_NAME").toString());

                row.createCell((short) 3).setCellValue(map.get("BYQ_TYPE") == null ? "" : map.get("BYQ_TYPE").toString());

                row.createCell((short) 4).setCellValue(map.get("BYQ_SERIES") == null ? "" : map.get("BYQ_SERIES").toString());

                row.createCell((short) 5).setCellValue(map.get("BYQ_VOL") == null ? "" : map.get("BYQ_VOL").toString());

                row.createCell((short) 6).setCellValue(map.get("PLANTNAME") == null ? "" : map.get("PLANTNAME").toString());

                row.createCell((short) 7).setCellValue(map.get("DEPARTNAME") == null ? "" : map.get("DEPARTNAME").toString());

                row.createCell((short) 8).setCellValue(map.get("LOC_PLANTNAME") == null ? "" : map.get("LOC_PLANTNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("DJ_LOC") == null ? "" : map.get("DJ_LOC").toString());

                row.createCell((short) 10).setCellValue(map.get("WORK_STATUS") == null ? "" : map.get("WORK_STATUS").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("变压器设备数据维护.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/pro_dj401_applylist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj401_applylist(@RequestParam(value = "plantcode_in") String plantcode_in,
                                                   @RequestParam(value = "departcode_in") String departcode_in,
                                                   @RequestParam(value = "usercode_in") String usercode_in,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj401_applylist(plantcode_in,departcode_in,usercode_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj401_submitapply", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj401_submitapply(@RequestParam(value = "applyid_in") String applyid_in,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj401_submitapply(applyid_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj401_deleteapply", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj401_deleteapply(@RequestParam(value = "applyid_in") String applyid_in,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj401_deleteapply(applyid_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj401_mendplant", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj401_mendplant(HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj401_mendplant();
        return result;
    }

    @RequestMapping(value = "/pro_mm_itype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_mm_itype(HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = djService.pro_mm_itype();
        return result;
    }

    @RequestMapping(value = "/pro_dj401_getapplyorderid", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj401_getapplyorderid(@RequestParam(value = "a_plantcode") String a_plantcode,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj401_getapplyorderid(a_plantcode);
        return result;
    }

    @RequestMapping(value = "/pro_dj401_applymatlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj401_applymatlist(@RequestParam(value = "applyid_in") String applyid_in,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj401_applymatlist(applyid_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj401_applysave", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj401_applysave(@RequestParam(value = "applyid_in") String applyid_in,
                                                    @RequestParam(value = "plantcode_in") String plantcode_in,
                                                    @RequestParam(value = "plantname_in") String plantname_in,
                                                    @RequestParam(value = "departcode_in") String departcode_in,
                                                    @RequestParam(value = "departname_in") String departname_in,

                                                    @RequestParam(value = "usercode_in") String usercode_in,
                                                    @RequestParam(value = "username_in") String username_in,
                                                    @RequestParam(value = "billcode_in") String billcode_in,
                                                    @RequestParam(value = "dj_uq_code_in") String dj_uq_code_in,
                                                    @RequestParam(value = "djname_in") String djname_in,

                                                    @RequestParam(value = "context_in") String context_in,
                                                    @RequestParam(value = "begindate_in") @DateTimeFormat(pattern = "yyyy-MM-dd") Date begindate_in,
                                                    @RequestParam(value = "enddate_in") @DateTimeFormat(pattern = "yyyy-MM-dd") Date enddate_in,
                                                    @RequestParam(value = "v_plantcodejs") String v_plantcodejs,
                                                    @RequestParam(value = "remark_in") String remark_in,

                                                    @RequestParam(value = "djcode_in") String djcode_in,
                                                    @RequestParam(value = "confirm_flag_in") String confirm_flag_in,
                                                    @RequestParam(value = "mend_type_in") String mend_type_in,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj401_applysave(applyid_in, plantcode_in, plantname_in, departcode_in, departname_in,
                usercode_in, username_in, billcode_in, dj_uq_code_in, djname_in,
                context_in, begindate_in, enddate_in, v_plantcodejs, remark_in,
                djcode_in, confirm_flag_in, mend_type_in);
        return result;
    }

    /*@RequestMapping(value = "/pro_dj401_deleteapplymat", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj401_deleteapplymat(@RequestParam(value = "id_in") String id_in,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj401_deleteapplymat(id_in);
        return result;
    }

    @RequestMapping(value = "/pro_dj401_addapplymat", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_dj401_addapplymat(@RequestParam(value = "matcode_in") String matcode_in,
                                                        @RequestParam(value = "matname_in") String matname_in,
                                                        @RequestParam(value = "etalon_in") String etalon_in,
                                                        @RequestParam(value = "matcl_in") String matcl_in,
                                                        @RequestParam(value = "unit_in") String unit_in,

                                                        @RequestParam(value = "fprice_in") String fprice_in,
                                                        @RequestParam(value = "amount_in") String amount_in,
                                                        @RequestParam(value = "kcid_in") String kcid_in,
                                                        @RequestParam(value = "applyid_in") String applyid_in,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = djService.pro_dj401_addapplymat(matcode_in,matname_in,etalon_in,matcl_in,unit_in,
                fprice_in,amount_in,kcid_in,applyid_in);
        return result;
    }*/
}



