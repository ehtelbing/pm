package org.building.pm.controller;

import org.building.pm.service.YdjService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller

@RequestMapping("/app/pm/Ydj")
public class YdjController {
    @Autowired
    private YdjService ydjService;

    //全查询部门管理表
    @RequestMapping(value = "/selectBaseDept",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> selectBaseDept(HttpServletRequest request, HttpServletResponse response){
        Map<String,Object> result = new HashMap<String,Object>();
        try {
            HashMap selectAll = ydjService.selectBaseDept();
            List<Map<String,Object>> baseDeptList = (List<Map<String,Object>>) selectAll.get("list");
            //创建list和map对象
            List<Map<String,Object>> list = new ArrayList<Map<String, Object>>();
            Map<String,Object> map ;
            for(int i = 0;i < baseDeptList.size();i++){
                map = baseDeptList.get(i);
                if("-1".equals(map.get("V_DEPTCODE_UP"))){
                    list.add(map);
                    fillChildCode(map,baseDeptList);
                }
            }
            result.put("baseDeptList",baseDeptList);
            result.put("list",list);
            result.put("success",true);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    //递归调用
    private void fillChildCode(Map<String,Object> map,List<Map<String,Object>> baseDeptList){
        //创建list对象
        List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
        //创建map对象
        Map<String,Object> mapChild;
        //循环克隆对象的长度
        for(int i = 0;i < baseDeptList.size();i++){
            mapChild = baseDeptList.get(i);
            if(map.get("V_DEPTCODE").equals(mapChild.get("V_DEPTCODE_UP"))){
                list.add(mapChild);
                fillChildCode(mapChild,baseDeptList);
            }
        }
        map.put("list",list);
    }

    //加载
    @RequestMapping(value = "loadBaseDept",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> loadBaseDept(@RequestParam(value = "I_DEPTID") Double I_DEPTID,HttpServletRequest request,HttpServletResponse response){
        Map<String,Object> result = new HashMap<String,Object>();
        try{
            result.put("baseDept",ydjService.loadBaseDept(I_DEPTID));
            result.put("success",true);
        }catch (SQLException e){
            e.printStackTrace();
        }
        return result;
    }
    //增加方法
    @RequestMapping(value = "/insertBaseDept",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> insertBaseDept(@RequestParam(value = "V_DEPTCODE") String V_DEPTCODE,
                                               @RequestParam(value = "V_DEPTNAME") String V_DEPTNAME,
                                               @RequestParam(value = "V_DEPTSMALLNAME") String V_DEPTSMALLNAME,
                                               @RequestParam(value = "V_DEPTFULLNAME") String V_DEPTFULLNAME,
                                               @RequestParam(value = "V_DEPTTYPE") String V_DEPTTYPE,
                                               @RequestParam(value = "V_DEPTCODE_UP") String V_DEPTCODE_UP,
                                               @RequestParam(value = "I_ORDERID") Double I_ORDERID,
                                               @RequestParam(value = "I_FLAG") Double I_FLAG,
                                               @RequestParam(value = "V_SAP_DEPT") String V_SAP_DEPT,
                                               @RequestParam(value = "V_SAP_WORK") String V_SAP_WORK,
                                               @RequestParam(value = "V_SAP_JHGC") String V_SAP_JHGC,
                                               @RequestParam(value = "V_SAP_YWFW") String V_SAP_YWFW,
                                               @RequestParam(value = "V_DEPT_WBS") String V_DEPT_WBS,
                                               @RequestParam(value = "V_WBS_NUM") String V_WBS_NUM,
                                               @RequestParam(value = "V_WXJH_REPAIRGUID") String V_WXJH_REPAIRGUID,
                                               HttpServletRequest request,
                                               HttpServletResponse response){
        Map<String,Object> result =new HashMap<String,Object>();
        try {
            Map<String,Object> resultMap = ydjService.insertBaseDept(V_DEPTCODE,V_DEPTNAME,V_DEPTSMALLNAME,V_DEPTFULLNAME,V_DEPTTYPE,V_DEPTCODE_UP,I_ORDERID,I_FLAG,V_SAP_DEPT,V_SAP_WORK,V_SAP_JHGC,V_SAP_YWFW,V_DEPT_WBS,V_WBS_NUM,V_WXJH_REPAIRGUID);

            if(!"success".equals(resultMap.get("V_INFO"))){
                throw new Exception((String)resultMap.get("V_INFO"));
            }
            result.put("V_INFO",resultMap.get("V_INFO"));
            result.put("baseDept",ydjService.loadByCodeBaseDept(V_DEPTCODE));
            result.put("success",true);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("message", BaseUtils.getErrorMessage(e, request));
            result.put("success", false);
        }
        return result;
    }

    //修改方法
    @RequestMapping(value = "/updateBaseDept",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> updateBaseDept(@RequestParam(value = "I_DEPTID") Double I_DEPTID,
                                               @RequestParam(value = "V_DEPTCODE") String V_DEPTCODE,
                                               @RequestParam(value = "V_DEPTNAME") String V_DEPTNAME,
                                               @RequestParam(value = "V_DEPTSMALLNAME") String V_DEPTSMALLNAME,
                                               @RequestParam(value = "V_DEPTFULLNAME") String V_DEPTFULLNAME,
                                               @RequestParam(value = "V_DEPTTYPE") String V_DEPTTYPE,
                                               @RequestParam(value = "V_DEPTCODE_UP") String V_DEPTCODE_UP,
                                               @RequestParam(value = "I_ORDERID") Double I_ORDERID,
                                               @RequestParam(value = "I_FLAG") Double I_FLAG,
                                               @RequestParam(value = "V_SAP_DEPT") String V_SAP_DEPT,
                                               @RequestParam(value = "V_SAP_WORK") String V_SAP_WORK,
                                               @RequestParam(value = "V_SAP_JHGC") String V_SAP_JHGC,
                                               @RequestParam(value = "V_SAP_YWFW") String V_SAP_YWFW,
                                               @RequestParam(value = "V_DEPT_WBS") String V_DEPT_WBS,
                                               @RequestParam(value = "V_WBS_NUM") String V_WBS_NUM,
                                               @RequestParam(value = "V_WXJH_REPAIRGUID") String V_WXJH_REPAIRGUID,
                                               HttpServletRequest request,
                                               HttpServletResponse response){
        Map<String,Object> result =new HashMap<String,Object>();
        try {
            Map<String,Object> resultMap = ydjService.updateBaseDept(I_DEPTID,V_DEPTCODE,V_DEPTNAME,V_DEPTSMALLNAME,V_DEPTFULLNAME,V_DEPTTYPE,V_DEPTCODE_UP,I_ORDERID,I_FLAG,V_SAP_DEPT,V_SAP_WORK,V_SAP_JHGC,V_SAP_YWFW,V_DEPT_WBS,V_WBS_NUM,V_WXJH_REPAIRGUID);
            if(!"success".equals(resultMap.get("V_INFO"))){
                throw new Exception((String)resultMap.get("V_INFO"));
            }

            result.put("V_INFO",resultMap.get("V_INFO"));
            result.put("baseDept",ydjService.loadBaseDept(I_DEPTID));
            result.put("success",true);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("message", BaseUtils.getErrorMessage(e, request));
            result.put("success", false);
        }
        return result;
    }

    //删除方法
    @RequestMapping(value = "/deleteBaseDept",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> deleteBaseDept(@RequestParam(value = "I_DEPTID") Integer I_DEPTID,
                                               HttpServletRequest request,HttpServletResponse response){
        Map<String,Object> result = new HashMap<String,Object>();
        try {
            Map<String,Object> resultMap = new HashMap<String,Object>();
            resultMap = ydjService.deleteBaseDept(I_DEPTID);
            result.put("V_INFO",resultMap.get("V_INFO"));
            result.put("success",true);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    //移动方法
    @RequestMapping(value = "moveBaseDept",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> moveBaseDept(@RequestParam(value = "I_DEPTID") Double I_DEPTID,
                                             @RequestParam(value = "V_DEPTCODE") String V_DEPTCODE,
                                             @RequestParam(value = "V_DEPTCODE_UP") String V_DEPTCODE_UP,
                                             HttpServletRequest request,
                                             HttpServletResponse response){
        Map<String,Object> result = new HashMap<String,Object>();
        try {
            Map<String,Object> resultMap = new HashMap<String,Object>();
            resultMap = ydjService.moveBaseDept(I_DEPTID,V_DEPTCODE_UP);
            result.put("V_INFO",resultMap.get("V_INFO"));
            result.put("baseDept",ydjService.loadByCodeBaseDept(V_DEPTCODE));
            result.put("success",true);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }
}
