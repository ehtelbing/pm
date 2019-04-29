package org.building.pm.controller;

import org.building.pm.service.PM_07Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 17-4-23.
 */
@Controller
@RequestMapping("/app/pm/PM_07")
public class PM_07Controller {

    @Autowired
    private PM_07Service pm_07Service;

    @RequestMapping(value = "/PRO_PM_WORKORDER_DEFECT_SAVE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_DEFECT_SAVE(@RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                            @RequestParam(value = "V_V_DEFECT_GUID") String V_V_DEFECT_GUID,
                                                            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                            @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                            @RequestParam(value = "V_D_START_DATE") String V_D_START_DATE,
                                                            @RequestParam(value = "V_D_FINISH_DATE") String V_D_FINISH_DATE,
                                                            @RequestParam(value = "V_V_WBS") String V_V_WBS,
                                                            @RequestParam(value = "V_V_WBS_TXT") String V_V_WBS_TXT,
                                                            @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_07Service.PRO_PM_WORKORDER_DEFECT_SAVE(V_V_PERNAME, V_V_DEFECT_GUID, V_V_ORDERGUID, V_V_SHORT_TXT,
                V_D_START_DATE,V_D_FINISH_DATE,V_V_WBS,V_V_WBS_TXT,V_V_DEPTCODEREPARIR);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_07_GET_DEPTEQU_PER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_GET_DEPTEQU_PER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                         @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                         @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,

                                                         HttpServletRequest request,
                                                         HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = pm_07Service.PRO_PM_07_GET_DEPTEQU_PER(V_V_PERSONCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE);
        return result;
    }
    /**
     *
     t hrows Exception {
     Map<String, Object> result = new HashMap<String, Object>();

     HashMap data = pm_07Service.PRO_PM_07_GET_DEPTEQU_PER(V_V_PERSONCODE,V_V_DEPTCODENEXT,V_V_EQUTYPECODE);

     List<Map<String, Object>> pm_07list = (List) data.get("list");

     result.put("list", pm_07list);
     result.put("success", true);
     return result;
     }*/

    /*厂矿*/
    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW_ROLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_VIEW_ROLE(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                       @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                       @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_07Service.PRO_BASE_DEPT_VIEW_ROLE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_DEPTTYPE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    /*子设备*/
    @RequestMapping(value = "PRO_PM_07_SAP_EQU_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_SAP_EQU_GET(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                     @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                     @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                                     @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                     @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                     HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = pm_07Service.PRO_PM_07_SAP_EQU_GET(V_V_PERSONCODE,V_V_DEPTCODE,V_V_DEPTNEXTCODE,
                V_V_EQUTYPECODE,V_V_EQUCODE);
        return result;
    }
    /*缺陷来源*/
    @RequestMapping(value = "/PRO_PM_07_DEFECT_SOURCE_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_SOURCE_VIEW(
            HttpServletRequest request,
            HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = pm_07Service.PRO_PM_07_DEFECT_SOURCE_VIEW();
        return result;
    }

    /*缺陷等级*/
    @RequestMapping(value = "/PRO_PM_07_DEFECT_LEVEL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_LEVEL_SEL(
            HttpServletRequest request,
            HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = pm_07Service.PRO_PM_07_DEFECT_LEVEL_SEL();
        return result;
    }

    /*保存过程*/
    @RequestMapping(value = "/PRO_PM_07_PP_DEFECT_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_07_PP_DEFECT_SET(@RequestParam(value = "V_I_ID") String V_I_ID,
                                       @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                       @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                       @RequestParam(value = "V_V_CHILDEQUCODE") String V_V_CHILDEQUCODE,
                                       @RequestParam(value = "V_D_DEFECTDATE") String V_D_DEFECTDATE,
                                       @RequestParam(value = "V_D_INDATE") String V_D_INDATE,
                                       @RequestParam(value = "V_V_DESCRIPTION") String V_V_DESCRIPTION,
                                       @RequestParam(value = "V_V_SUGGESTION") String V_V_SUGGESTION,
                                       @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                       @RequestParam(value = "V_V_PERSONNAME") String V_V_PERSONNAME,
                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                       @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
                                       @RequestParam(value = "V_V_LEVEL") String V_V_LEVEL,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_07Service.PRO_PM_07_PP_DEFECT_SET(V_I_ID, V_V_EQUCODE, V_V_EQUTYPE,V_V_CHILDEQUCODE,
                V_D_DEFECTDATE,V_D_INDATE,V_V_DESCRIPTION,V_V_SUGGESTION,V_V_PERSONCODE,V_V_PERSONNAME,
                V_V_DEPTCODE,V_V_SOURCECODE,V_V_LEVEL);
        test.put("list", result);
        return test;
    }
    /*保存过程*/
    @RequestMapping(value = "/PRO_PM_07_DEFECT_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_07_DEFECT_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                    @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                    @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                    @RequestParam(value = "V_V_INPERCODE") String V_V_INPERCODE,
                                    @RequestParam(value = "V_V_INPERNAME") String V_V_INPERNAME,
                                    @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
                                    @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
                                    @RequestParam(value = "V_V_SOURCEID") String V_V_SOURCEID,
                                    @RequestParam(value = "V_D_DEFECTDATE") String V_D_DEFECTDATE,
                                    @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                    @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                    @RequestParam(value = "V_V_EQUCHILDCODE") String V_V_EQUCHILDCODE,
                                    @RequestParam(value = "V_V_IDEA") String V_V_IDEA,
                                    @RequestParam(value = "V_V_LEVEL") String V_V_LEVEL,
                                    @RequestParam(value = "V_V_PROWAY") String V_V_PROWAY,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = pm_07Service.PRO_PM_07_DEFECT_SET(V_V_GUID, V_V_PERCODE,V_V_PERNAME,V_V_INPERCODE,V_V_INPERNAME,V_V_DEFECTLIST, V_V_SOURCECODE,
                V_V_SOURCEID, V_D_DEFECTDATE, V_V_DEPTCODE, V_V_EQUCODE, V_V_EQUCHILDCODE, V_V_IDEA,
                V_V_LEVEL,V_V_PROWAY);
        return result;
    }

//2018-09-27
//@RequestMapping(value = "/DEFECT_UPFILE_INSERT", method = RequestMethod.POST)
@RequestMapping(value = "/DEFECT_UPFILE_INSERT")
@ResponseBody
//public Map<String, Object> DEFECT_UPFILE_INSERT(@RequestParam(value = "V_V_BLOB") MultipartFile V_V_BLOB,
public ResponseEntity<String> DEFECT_UPFILE_INSERT(@RequestParam(value = "V_V_BLOB") MultipartFile V_V_BLOB,
                                                   @RequestParam(value = "V_GUID") String V_GUID,
                                @RequestParam(value = "V_FILENAME") String V_FILENAME,
                                @RequestParam(value = "V_PLANT") String V_PLANT,
                                @RequestParam(value = "V_DEPT") String V_DEPT,
                                @RequestParam(value = "V_PERSONCODE") String V_PERSONCODE,
                                HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
    HttpHeaders responseHeaders = new HttpHeaders();
    responseHeaders.setContentType(MediaType.TEXT_HTML);
    String filename=V_V_BLOB.getOriginalFilename();
    Map<String, Object> result = pm_07Service.DEFECT_UPFILE_INSERT(V_GUID, filename, V_V_BLOB.getInputStream(), V_V_BLOB.getContentType(),V_PLANT, V_DEPT, V_PERSONCODE);
    String list = (String) result.get("list");
//    result.put("list", list);
//    result.put("success", true);
    String json= "{\"success\":true,\"message\":\""+result+"\"}";
    return new ResponseEntity<String>(json, responseHeaders, HttpStatus.OK);
//    return result;
}

    @RequestMapping(value = "/DEFECT_UPFILE_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map DEFECT_UPFILE_SELECT(@RequestParam(value = "V_GUID") String V_GUID,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = pm_07Service.DEFECT_UPFILE_SELECT(V_GUID);
        return result;
    }
    @RequestMapping(value = "/DEFECT_UPFILE_DELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map DEFECT_UPFILE_DELETE(@RequestParam(value = "V_FILECODE") String V_FILECODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = pm_07Service.DEFECT_UPFILE_DELETE(V_FILECODE);
        return result;
    }

    @RequestMapping(value = "/DEFECT_UPFILE_DOWN_NTKO", method = RequestMethod.GET)
    @ResponseBody
    public void DEFECT_UPFILE_DOWN_NTKO(@RequestParam(value = "V_V_FILECODE") String V_V_FILECODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = pm_07Service.DEFECT_UPFILE_DOWN_NTKO(V_V_FILECODE);


        Blob fileblob = (Blob) result.get("V_V_BLOB");

        InputStream is = fileblob.getBinaryStream();


        OutputStream fos = response.getOutputStream();
        byte[] b = new byte[20480];
        int length;
        while ((length = is.read(b)) > 0) {
            fos.write(b, 0, length);
        }
        is.close();
        fos.close();
    }

}
