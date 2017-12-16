package org.building.pm.controller;

import org.building.pm.service.SgService;
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
 * �豸�¹�controller
 *
 */
@Controller
@RequestMapping("/app/pm/sg")
public class SgController {

    @Autowired
    private SgService sgService;


    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    @ResponseBody
    public  Map uploadFile(@RequestParam(value = "upload") MultipartFile upload,
                                 @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                 @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                                 @RequestParam(value = "V_V_FILETYPE") String V_V_FILETYPE,
                                 @RequestParam(value = "V_V_FILEPER") String V_V_FILEPER,
                                 @RequestParam(value = "V_V_FILETIME") String V_V_FILETIME,
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
        result = sgService.SG_INF_FILE_SET(V_V_GUID, V_V_FILEGUID, filename,filedata,
                V_V_FILETYPE,V_V_FILEPER,V_V_FILETIME);
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
        result = sgService.SG_INF_FILE_GET(V_V_FILEGUID);
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
    * 事故厂矿查询
    * */
    @RequestMapping(value = "PRO_BASE_DEPT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_SEL(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                         @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
                                         @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                         HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = sgService.PRO_BASE_DEPT_SEL(V_V_DEPTCODE, V_V_DEPTNAME, V_V_DEPTTYPE);
        return result;
    }

    /*
    * 事故类型查询
    * */
    @RequestMapping(value = "PM_14_SG_INF_TYPE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_SG_INF_TYPE_SEL(
                                                 HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = sgService.PM_14_SG_INF_TYPE_SEL();
        return result;
    }

    /*
    * 事故原因查询
    * */
    @RequestMapping(value = "SG_INF_REASON_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SG_INF_REASON_SEL(
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = sgService.SG_INF_REASON_SEL();
        return result;
    }

    /*
   * 事故查询
   * */
    @RequestMapping(value = "SG_INF_DATA_ITEM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SG_INF_DATA_ITEM_SEL(@RequestParam(value = "V_V_SG_NAME") String V_V_SG_NAME,
                                                 @RequestParam(value = "V_V_SG_STIME") String V_V_SG_STIME,
                                                 @RequestParam(value = "V_V_SG_ETIME") String V_V_SG_ETIME,
                                                 @RequestParam(value = "V_V_SG_DEPT") String V_V_SG_DEPT,
                                                 @RequestParam(value = "V_V_SG_TYPE") String V_V_SG_TYPE,
                                                 @RequestParam(value = "V_V_SG_YY") String V_V_SG_YY,
                                                 HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = sgService.SG_INF_DATA_ITEM_SEL(V_V_SG_NAME, V_V_SG_STIME, V_V_SG_ETIME,
                V_V_SG_DEPT,V_V_SG_TYPE,V_V_SG_YY);
        return result;
    }

    /*
   * 事故录入
   * */
    @RequestMapping(value = "/SG_INF_DATA_ITEM_SAVE", method = RequestMethod.POST)
    @ResponseBody
    public Map SG_INF_DATA_ITEM_SAVE(@RequestParam(value = "V_V_ID") String V_V_ID,
                               @RequestParam(value = "V_V_GUID") String V_V_GUID,
                               @RequestParam(value = "V_V_SG_NAME") String V_V_SG_NAME,
                               @RequestParam(value = "V_V_SG_TIME") String V_V_SG_TIME,
                               @RequestParam(value = "V_V_SG_DEPTCODE") String V_V_SG_DEPTCODE,
                               @RequestParam(value = "V_V_SG_PLACE") String V_V_SG_PLACE,
                               @RequestParam(value = "V_V_SG_TYPECODE") String V_V_SG_TYPECODE,
                               @RequestParam(value = "V_V_SG_PER") String V_V_SG_PER,
                               @RequestParam(value = "V_V_SG_EQUCODE") String V_V_SG_EQUCODE,
                               @RequestParam(value = "V_V_SG_YY") String V_V_SG_YY,
                               @RequestParam(value = "V_V_SG_JG") String V_V_SG_JG,
                               HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = sgService.SG_INF_DATA_ITEM_SAVE(V_V_ID, V_V_GUID, V_V_SG_NAME, V_V_SG_TIME, V_V_SG_DEPTCODE,
                V_V_SG_PLACE, V_V_SG_TYPECODE, V_V_SG_PER, V_V_SG_EQUCODE, V_V_SG_YY, V_V_SG_JG);
        test.put("list", result);
        return test;
    }

    /*
   * 事故查询ByGuid
   * */
    @RequestMapping(value = "SG_INF_DATA_ITEM_SELBYGUID", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SG_INF_DATA_ITEM_SELBYGUID(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                    HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = sgService.SG_INF_DATA_ITEM_SELBYGUID(V_V_GUID);
        return result;
    }

    /*
   * 事故检修录入
   * */
    @RequestMapping(value = "/SG_JX_INF_ITEM_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map SG_JX_INF_ITEM_EDIT(@RequestParam(value = "V_V_ID") String V_V_ID,
                                     @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                     @RequestParam(value = "V_V_STIME") String V_V_STIME,
                                     @RequestParam(value = "V_V_ETIME") String V_V_ETIME,
                                     @RequestParam(value = "V_V_ORG") String V_V_ORG,
                                     @RequestParam(value = "V_V_HJ") String V_V_HJ,
                                     @RequestParam(value = "V_V_BZ") String V_V_BZ,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = sgService.SG_JX_INF_ITEM_EDIT(V_V_ID, V_V_GUID, V_V_STIME, V_V_ETIME, V_V_ORG,
                V_V_HJ, V_V_BZ);
        test.put("list", result);
        return test;
    }

    /*
   * 事故删除
   * */
    @RequestMapping(value = "/SG_INF_DATA_ITEM_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map SG_INF_DATA_ITEM_DEL(
                                   @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = sgService.SG_INF_DATA_ITEM_DEL( V_V_GUID);
        test.put("list", result);
        return test;
    }

    /*
   * 事故考核录入
   * */
    @RequestMapping(value = "/SG_KH_INF_ITEM_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map SG_KH_INF_ITEM_EDIT(@RequestParam(value = "V_V_ID") String V_V_ID,
                                   @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                   @RequestParam(value = "V_V_ORG") String V_V_ORG,
                                   @RequestParam(value = "V_V_ZB") String V_V_ZB,
                                   @RequestParam(value = "V_V_PER") String V_V_PER,
                                   @RequestParam(value = "V_V_TK") String V_V_TK,
                                   @RequestParam(value = "V_V_BZ") String V_V_BZ,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = sgService.SG_KH_INF_ITEM_EDIT(V_V_ID, V_V_GUID, V_V_ORG, V_V_ZB, V_V_PER,
                V_V_TK, V_V_BZ);
        test.put("list", result);
        return test;
    }

    /*
   * 事故影响录入
   * */
    @RequestMapping(value = "/SG_YX_INF_ITEM_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map SG_YX_INF_ITEM_EDIT(@RequestParam(value = "V_V_ID") String V_V_ID,
                                   @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                   @RequestParam(value = "V_V_XFFY") String V_V_XFFY,
                                   @RequestParam(value = "V_V_JCFY") String V_V_JCFY,
                                   @RequestParam(value = "V_V_QTSS") String V_V_QTSS,
                                   @RequestParam(value = "V_V_SSHJ") String V_V_SSHJ,
                                   @RequestParam(value = "V_V_YYSJ") String V_V_YYSJ,
                                   @RequestParam(value = "V_V_INF") String V_V_INF,
                                   @RequestParam(value = "V_V_ZGCS") String V_V_ZGCS,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = sgService.SG_YX_INF_ITEM_EDIT(V_V_ID, V_V_GUID, V_V_XFFY, V_V_JCFY, V_V_QTSS,
                V_V_SSHJ, V_V_YYSJ,V_V_INF,V_V_ZGCS);
        test.put("list", result);
        return test;
    }

    /*
    * 附件查询
    * */
    @RequestMapping(value = "SG_INF_FILE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SG_INF_FILE_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                 @RequestParam(value = "V_V_FILETYPE") String V_V_FILETYPE,
                                                 HttpServletRequest request)
            throws SQLException, UnsupportedEncodingException {
        Map<String, Object> result = sgService.SG_INF_FILE_SEL(V_V_GUID, V_V_FILETYPE);
        return result;
    }

    /*
  * 附件删除
  * */
    @RequestMapping(value = "/SG_INF_FILE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map SG_INF_FILE_DEL(@RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                               HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = sgService.SG_INF_FILE_DEL(V_V_FILEGUID);
        test.put("list", result);
        return test;
    }

    /*@RequestMapping(value = "/PRO_BASE_FILE_ADD2", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_FILE_ADD2(@RequestParam(value = "V_V_GUID2") String V_V_GUID2,
                                                  @RequestParam(value = "V_V_FILENAME2") String V_V_FILENAME2,
                                                  @RequestParam(value = "V_V_FILEBLOB2") MultipartFile V_V_FILEBLOB2,
                                                  @RequestParam(value = "V_V_FILETYPECODE2") String V_V_FILETYPECODE2,
                                                  @RequestParam(value = "V_V_PLANT2") String V_V_PLANT2,
                                                  @RequestParam(value = "V_V_DEPT2") String V_V_DEPT2,
                                                  @RequestParam(value = "V_V_PERSON2") String V_V_PERSON2,
                                                  @RequestParam(value = "V_V_REMARK2") String V_V_REMARK2,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = sgService.PRO_BASE_FILE_ADD(V_V_GUID2, V_V_FILENAME2, V_V_FILEBLOB2.getInputStream(), V_V_FILETYPECODE2, V_V_PLANT2, V_V_DEPT2, V_V_PERSON2, V_V_REMARK2);

        String pm_1012 = (String) data.get("RET");

        result.put("RET", pm_1012);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_FILE_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_FILE_ADD(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                 @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
                                                 @RequestParam(value = "V_V_FILEBLOB") MultipartFile V_V_FILEBLOB,
                                                 @RequestParam(value = "V_V_FILETYPECODE") String V_V_FILETYPECODE,
                                                 @RequestParam(value = "V_V_PLANT") String V_V_PLANT,
                                                 @RequestParam(value = "V_V_DEPT") String V_V_DEPT,
                                                 @RequestParam(value = "V_V_PERSON") String V_V_PERSON,
                                                 @RequestParam(value = "V_V_REMARK") String V_V_REMARK,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = sgService.PRO_BASE_FILE_ADD(V_V_GUID, V_V_FILENAME, V_V_FILEBLOB.getInputStream(), V_V_FILETYPECODE, V_V_PLANT, V_V_DEPT, V_V_PERSON, V_V_REMARK);

        String pm_1012 = (String) data.get("RET");

        result.put("RET", pm_1012);
        result.put("success", true);
        return result;
    }*/
}
