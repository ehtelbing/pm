package org.building.pm.controller;

import org.building.pm.service.DxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2017/1/22.
 *
 * 大修controller
 *
 */
@Controller
@RequestMapping("/app/pm/dx")
public class DxController {

    @Autowired
    private DxService dxService;

    /*
    * 厂矿查询
    * */
    @RequestMapping(value = "plant_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> plant_sel(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                         @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                         @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                         @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                         HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = dxService.plant_sel(V_V_PERSONCODE, V_V_DEPTCODE,V_V_DEPTCODENEXT,V_V_DEPTTYPE);
        return result;
    }

    /*
    * 作业区查询
    * */
    @RequestMapping(value = "dept_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> dept_sel(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                        @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                        @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                        @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                        HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = dxService.dept_sel(V_V_PERSONCODE, V_V_DEPTCODE,V_V_DEPTCODENEXT,V_V_DEPTTYPE);
        return result;
    }

    /*
    * 项目类型查询
    * */
    @RequestMapping(value = "PMDX_ITEMS_TYPE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PMDX_ITEMS_TYPE_SEL(
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = dxService.PMDX_ITEMS_TYPE_SEL();
        return result;
    }

    /*
    * 甘特图查询
    * */
    @RequestMapping(value = "PMDX_ITEMS_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PMDX_ITEMS_SEL(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                              @RequestParam(value = "V_V_PARTCODE") String V_V_PARTCODE,
                                              @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                              HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = dxService.PMDX_ITEMS_SEL(V_V_YEAR,V_V_PARTCODE,V_V_DEPTCODE);
        return result;
    }


    @RequestMapping(value = "/PMDX_ITEMS_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map PMDX_ITEMS_EDIT(@RequestParam(value = "V_I_ID") String V_I_ID,
                          @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                          @RequestParam(value = "V_V_ITEMTYPE") String V_V_ITEMTYPE,
                          @RequestParam(value = "V_V_ITEM_CODE") String V_V_ITEM_CODE,
                          @RequestParam(value = "V_V_ITEM_CODEUP") String V_V_ITEM_CODEUP,
                          @RequestParam(value = "V_V_ITEM_MEMO") String V_V_ITEM_MEMO,
                          @RequestParam(value = "V_D_DATE_B") String V_D_DATE_B,
                          @RequestParam(value = "V_D_DATE_E") String V_D_DATE_E,
                          @RequestParam(value = "V_D_DATE_IN") String V_D_DATE_IN,
                          @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                          @RequestParam(value = "V_I_YEAR") String V_I_YEAR,
                          @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                          @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                          @RequestParam(value = "V_V_ITEM_NAME") String V_V_ITEM_NAME,
                          @RequestParam(value = "V_V_ITEM_NAMEUP") String V_V_ITEM_NAMEUP,
                          HttpServletRequest request,
                          HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = dxService.PMDX_ITEMS_EDIT(V_I_ID, V_V_EQUCODE,V_V_ITEMTYPE ,V_V_ITEM_CODE, V_V_ITEM_CODEUP,
                V_V_ITEM_MEMO,V_D_DATE_B,V_D_DATE_E,V_D_DATE_IN,V_V_PERCODE,V_I_YEAR,V_V_ORGCODE,V_V_DEPTCODE,
                V_V_ITEM_NAME,V_V_ITEM_NAMEUP);
        test.put("list", result);
        return test;
    }

    /*
    * 甘特图查询
    * */
    @RequestMapping(value = "PRO_GET_DEPTEQU_WXPER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_GET_DEPTEQU_WXPER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                              @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                              @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                              HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = dxService.PRO_GET_DEPTEQU_WXPER(V_V_PERSONCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE);
        return result;
    }

    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    @ResponseBody
    public  Map uploadFile(@RequestParam(value = "upload") MultipartFile upload,
                           @RequestParam(value = "V_V_GUID") String V_V_GUID,
                           @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                           @RequestParam(value = "V_V_FILEPER") String V_V_FILEPER,
                           @RequestParam(value = "V_V_FILEDATE") String V_V_FILEDATE,
                           HttpServletRequest request,HttpServletResponse response, ModelMap model) throws Exception {
        String filename = upload.getOriginalFilename();

        String path = request.getSession().getServletContext().getRealPath("upload");

        File targetFile = new File(path, filename);
        if(!targetFile.exists()){
            targetFile.mkdirs();
        }
        //保存
        try {
            upload.transferTo(targetFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("fileUrl", request.getContextPath()+"/upload/"+filename);
        FileInputStream filedata = null;
        filedata = new FileInputStream(path+"/"+filename);

        Map test = new HashMap();

        List<Map> result = null;
        result = dxService.PMDX_ITEM_FILE_INSERT(V_V_GUID, V_V_FILEGUID, filename, filedata,
                V_V_FILEPER, V_V_FILEDATE);
        test.put("list", result);
        test.put("success", true);
        return test;
    }

    @RequestMapping(value = "/downloadFile", method = RequestMethod.POST)
    @ResponseBody
    public  Map downloadFile(@RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                             @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
                             HttpServletRequest request,HttpServletResponse response, ModelMap model) throws Exception {

        List<Map> result = null;
        result = dxService.PMDX_ITEM_FILE_GET(V_V_FILEGUID);
        Blob fileblob = (Blob) result.get(0).get("V_FILEBLOB");
        InputStream is = fileblob.getBinaryStream();

        response.setContentType("application/octet-stream");
        response.setCharacterEncoding("UTF-8");
        try {
            V_V_FILENAME = URLEncoder.encode(V_V_FILENAME, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        response.setHeader("Content-Disposition", "attachment; filename=" + V_V_FILENAME);
        OutputStream fos = response.getOutputStream();
        byte[] b = new byte[2048];
        int length;
        while ((length = is.read(b)) > 0) {
            fos.write(b, 0, length);
        }
        is.close();
        fos.close();
        Map test = new HashMap();
        test.put("success",true);
        return test;
    }

    /*
    * 附件查询
    * */
    @RequestMapping(value = "SG_INF_FILE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SG_INF_FILE_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                               HttpServletRequest request)
            throws SQLException, UnsupportedEncodingException {
        Map<String, Object> result = dxService.PMDX_ITEM_FILE_SEL(V_V_GUID);
        return result;
    }

    /*
  * 附件删除
  * */
    @RequestMapping(value = "/PMDX_ITEM_FILE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PMDX_ITEM_FILE_DEL(@RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                               HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = dxService.PMDX_ITEM_FILE_DEL(V_V_FILEGUID);
        test.put("list", result);
        return test;
    }
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TREE_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_EQUREPAIRPLAN_TREE_GET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                             @RequestParam(value = "V_BY1") String V_BY1,
                                             @RequestParam(value = "V_BY2") String V_BY2,
                                             @RequestParam(value = "V_BY3") String V_BY3,
                                  HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        Map result = dxService.PRO_PM_EQUREPAIRPLAN_TREE_GET(V_V_GUID,V_BY1,V_BY2,V_BY3);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_YG_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_EQUREPAIRPLAN_YG_VIEW(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        Map result = dxService.PRO_PM_EQUREPAIRPLAN_YG_VIEW(V_V_GUID);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_WL_VIEW", method = RequestMethod.POST)
       @ResponseBody
       public Map PRO_PM_EQUREPAIRPLAN_WL_VIEW(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map result = dxService.PRO_PM_EQUREPAIRPLAN_WL_VIEW(V_V_GUID);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_JJ_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_EQUREPAIRPLAN_JJ_VIEW(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map result = dxService.PRO_PM_EQUREPAIRPLAN_JJ_VIEW(V_V_GUID);
        return result;
    }

    @RequestMapping(value = "/PRO_MONTH_WEEK_DEFECT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MONTH_WEEK_DEFECT_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map result = dxService.PRO_MONTH_WEEK_DEFECT_SEL(V_V_GUID);
        return result;
    }
}
