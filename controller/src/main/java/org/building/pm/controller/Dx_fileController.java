package org.building.pm.controller;
import org.building.pm.service.Dx_fileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

    //---附件类型查询
    @RequestMapping(value="FILETYPE_GETLIST",method=RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> FILETYPE_GETLIST(@RequestParam(value="SIGN") String SIGN,
                                               HttpServletRequest request,
                                               HttpServletResponse response)throws Exception{
        Map<String,Object> result=dx_fileService.FILETYPE_GETLIST(SIGN);
        return result;
    }

    @RequestMapping(value = "PM_03_PLAN_PROJECT_FILE_SEL2", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_PROJECT_FILE_SEL2(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
            @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE) throws Exception {

        Map result = dx_fileService.PM_03_PLAN_PROJECT_FILE_SEL2(V_V_GUID, V_V_FILEGUID, V_V_FILENAME, V_V_TYPE);
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
