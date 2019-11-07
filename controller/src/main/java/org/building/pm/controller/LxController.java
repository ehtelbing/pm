package org.building.pm.controller;

import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.LxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/app/pm/lx")
public class LxController {

    @Value("#{configProperties['PM_JST']}")
    private String pm_jst;

    @Autowired
    private LxService lxService;

    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_VIEW(
            @RequestParam(value = "IS_V_DEPTCODE") String IS_V_DEPTCODE,
            @RequestParam(value = "IS_V_DEPTTYPE") String IS_V_DEPTTYPE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = lxService.PRO_BASE_DEPT_VIEW(IS_V_DEPTCODE, IS_V_DEPTTYPE);
        List<Map<String,Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_CYCLE_ABLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_CYCLE_ABLE(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = lxService.PRO_RUN_CYCLE_ABLE();
        List<Map<String,Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7111_EQULIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7111_EQULIST(
            @RequestParam(value = "v_v_plantcode") String v_v_plantcode,
            @RequestParam(value = "v_v_deptcode") String v_v_deptcode,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = lxService.PRO_RUN7111_EQULIST(v_v_plantcode, v_v_deptcode);
        List<Map<String,Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/GET_WORK_YEILD_table", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_WORK_YEILD_table(
            @RequestParam(value = "a_plantcode") String a_plantcode,
            @RequestParam(value = "a_departcode") String a_departcode,
            @RequestParam(value = "A_EQUID") String A_EQUID,
            @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
            @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
            @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

            Map result = lxService.GET_WORK_YEILD_table(a_plantcode,a_departcode,A_EQUID,A_BEGINDATE,A_ENDDATE,A_CYCLE_ID);

        return result;
    }

    //设备作业量台账导出Excel
    @RequestMapping(value = "/PG_RUN_YEILD_GET_WORK_YEILD_table", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PG_RUN_YEILD_GET_WORK_YEILD_table(
                                    @RequestParam(value = "a_plantcode") String a_plantcode,
                                    @RequestParam(value = "a_departcode") String a_departcode,
                                    @RequestParam(value = "A_EQUID") String A_EQUID,
                                     @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
                                     @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
                                     @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                                     HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        A_EQUID = URLDecoder.decode(A_EQUID, "UTF-8");
        A_CYCLE_ID = URLDecoder.decode(A_CYCLE_ID, "UTF-8");

        Map<String, Object> data = lxService.GET_WORK_YEILD_table(a_plantcode,a_departcode,A_EQUID, A_BEGINDATE, A_ENDDATE, A_CYCLE_ID);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 14; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("周期类型");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("计算单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("作业日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("作业量");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("CYCLE_DESC") == null ? "" : map.get("CYCLE_DESC").toString());

                row.createCell((short) 2).setCellValue(map.get("CYCLE_UNIT") == null ? "" : map.get("CYCLE_UNIT").toString());

                row.createCell((short) 3).setCellValue(map.get("EQUNAME") == null ? "" : map.get("EQUNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("WORKDATE") == null ? "" : map.get("WORKDATE").toString());

                row.createCell((short) 5).setCellValue(map.get("INSERT_VALUE") == null ? "" : map.get("INSERT_VALUE").toString());
            }
            row = sheet.createRow( list.size() + 1);
            row.createCell((short) 0).setCellValue("作业量合计：");
            row.createCell((short) 1).setCellValue(data.get("RET_SUM") == null ? "" : data.get("RET_SUM").toString());

            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("设备作业量台账Excel.xls".getBytes("UTF-8"), "ISO-8859-1");
                response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
