package org.building.pm.controller;
import javafx.application.Application;
import org.activiti.bpmn.converter.CallActivityXMLConverter;
import org.building.pm.service.Dx_fileService;
import org.building.pm.webpublic.MasageClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.ExtensionInstallationException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.filechooser.FileSystemView;
import java.io.*;
import java.net.URLDecoder;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/app/pm/dxfile/")
public class Dx_fileController {
    @Autowired
    private Dx_fileService dx_fileService;

    @RequestMapping(value = "PM_EDUNOTOWORKORDER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_EDUNOTOWORKORDER(@RequestParam(value = "V_EDUCODE") String V_EDUCODE,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws Exception {
        Map<String ,Object> result=new HashMap<String ,Object>();
        HashMap data = dx_fileService.PM_EDUNOTOWORKORDER(V_EDUCODE);
        return setPage(request,response,data);
    }

    //---附件类型查询(大修、模型）
    @RequestMapping(value="FILETYPE_GETLIST",method=RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> FILETYPE_GETLIST(@RequestParam(value="SIGN") String SIGN,
                                               HttpServletRequest request,
                                               HttpServletResponse response)throws Exception{
        Map<String,Object> result=dx_fileService.FILETYPE_GETLIST(SIGN);
        return result;
    }

    //大修附件查询
    @RequestMapping(value = "PM_03_PLAN_PROJECT_FILE_SEL2", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_PROJECT_FILE_SEL2(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
            @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE) throws Exception {
        Map result = dx_fileService.PM_03_PLAN_PROJECT_FILE_SEL2(V_V_GUID,V_V_FILEGUID,V_V_FILENAME,V_V_TYPE);
        return result;
    }

    /*检修模型添加附件*/
    @RequestMapping(value = "PM_MODEL_FILE_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_MODEL_FILE_ADD(
            @RequestParam(value="upload") MultipartFile file,
            @RequestParam(value="V_V_MODE_GUID") String V_V_MODE_GUID,
            @RequestParam(value="V_V_INPERCODE") String V_V_INPERCODE,
            @RequestParam(value="V_V_INPERNAME") String V_V_INPERNAME,
            @RequestParam(value="V_V_TYPE") String V_V_TYPE
    ) throws Exception {
        String V_V_FILENAME=file.getOriginalFilename();
        InputStream V_V_BLOB=file.getInputStream();
        String V_V_FILETYPE=file.getContentType();
        Map result = dx_fileService.PM_MODEL_FILE_ADD( V_V_FILENAME, V_V_BLOB, V_V_FILETYPE, V_V_MODE_GUID,V_V_INPERCODE,V_V_INPERNAME,V_V_TYPE);
        return result;
    }
    /*检修模型附件下载*/
    @RequestMapping(value = "PM_MODEL_FILE_DOWN", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PM_MODEL_FILE_DOWN(
            @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID
            ,HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {
        List<MasageClass> item = new ArrayList<MasageClass>();
        Map<String,Object> data = dx_fileService.PM_MODEL_FILE_DOWN(V_V_FILEGUID);
        List list = (List) data.get("list");
        Map listmap = (Map) list.get(0);
        String A_FILENAME= listmap.get("V_FILENAME").toString();;
        Blob blob=(Blob) data.get("V_V_BLOB");
        InputStream in = blob.getBinaryStream();
        OutputStream out=response.getOutputStream();
        response.setContentType("application/octet-stream");

        A_FILENAME= URLDecoder.decode(A_FILENAME,"utf-8");
        response.setCharacterEncoding("UTF-8");
        response.addHeader("Content-Disposition","attachment;filename="+new String(A_FILENAME.getBytes("gbk"),"iso8859-1"));
        byte[] b = new byte[2048];
        int length;
        while ((length = in.read(b)) > 0) {
            out.write(b, 0, length);
        }
       // try{
            MasageClass masageClass=new MasageClass();
            masageClass.setRet(data.get(0)==null?"":"success");
            item.add(masageClass);

            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            out.flush();
            in.close();
            out.close();
//        }catch(Exception e){
//            e.printStackTrace();
//        }
    }

    /*检修模型附件查询*/
    @RequestMapping(value = "PM_MODEL_FILE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_MODEL_FILE_SEL(
            @RequestParam(value = "V_V_MODE_GUID") String V_V_MODE_GUID,
            @RequestParam(value="V_V_TYPE") String V_V_TYPE
    ) throws Exception {

        Map result = dx_fileService.PM_MODEL_FILE_SEL(V_V_MODE_GUID,V_V_TYPE);
        return result;
    }

    /*检修模型附件删除*/
    @RequestMapping(value = "PM_MODEL_FILE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_MODEL_FILE_DEL(
            @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID
    ) throws Exception {

        Map result = dx_fileService.PM_MODEL_FILE_DEL(V_V_FILEGUID);
        return result;
    }
    /*检修模型附件写入大修附件*/
    @RequestMapping(value = "PM_MODEL_FILE_INSERT_DXF", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_MODEL_FILE_INSERT_DXF(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
            @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
            @RequestParam(value = "V_V_INPERCODE") String V_V_INPERCODE,
            @RequestParam(value = "V_V_INPERNAME") String V_V_INPERNAME,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
            @RequestParam(value = "V_V_FILETYPE") String V_V_FILETYPE,
            @RequestParam(value = "V_V_MODE_GUID") String V_V_MODE_GUID
    ) throws Exception {

        Map result = dx_fileService.PM_MODEL_FILE_INSERT_DXF(V_V_GUID,V_V_FILEGUID,V_V_FILENAME,V_V_INPERCODE,V_V_INPERNAME,V_V_TYPE,V_V_FILETYPE,V_V_MODE_GUID);
        return result;
    }
    //   大修删除模型附件
    @RequestMapping(value = "PM_MODEL_FILE_DEL_DXF", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_MODEL_FILE_DEL_DXF(
            @RequestParam(value="V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_MODE_GUID") String V_V_MODE_GUID
    ) throws Exception {
        Map result = dx_fileService.PM_MODEL_FILE_DEL_DXF(V_V_GUID,V_V_MODE_GUID);
        return result;
    }
    //   大修查询模型附件
    @RequestMapping(value = "PM_MODEL_FILE_SEL_DXF", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_MODEL_FILE_SEL_DXF(
            @RequestParam(value="V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_MODE_GUID") String V_V_MODE_GUID
    ) throws Exception {
        Map result = dx_fileService.PM_MODEL_FILE_SEL_DXF(V_V_GUID,V_V_MODE_GUID);
        return result;
    }

    @RequestMapping(value="/setPage",method=RequestMethod.POST)
    @ResponseBody
    public Map<String ,Object> setPage(HttpServletRequest req,HttpServletResponse resp,HashMap data){
        if(data==null){
            return data;
        }
        Map<String ,Object> result=new HashMap<String ,Object>();
        resp.setContentType("text/plain");
        Integer start=Integer.parseInt(req.getParameter("start"));
        Integer limit=Integer.parseInt(req.getParameter("limit"));
        Page page=new Page();
        page.setStart(start);
        page.setlimit(limit);
        List list=(List)data.get("list");
        List temp=new ArrayList();
        int total=list.size();
        int end=start+limit>total?total:start+limit;
        for(int i=start;i<end;i++){
            temp.add(list.get(i));
        }
        result.put("list",temp);
        result.put("total",total);
        result.put("success",true);
        return result;
    }
    public class Page{
        private  int start;
        private int limit;
        public int getStart(){
            return start;
        }
        public void setStart(int start){
            this.start=start;
        }
        public int getLimit(){
            return limit;
        }
        public void setlimit(int limit){
            this.limit=limit;
        }
        public Integer getPage(){
            return (start/limit)+1;
        }

    }
}
