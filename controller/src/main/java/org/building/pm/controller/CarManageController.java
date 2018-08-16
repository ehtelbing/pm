package org.building.pm.controller;

import org.building.pm.service.CarManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zpf on 2018/3/28.
 */
@Controller
@RequestMapping("/app/pm/CarManage")
public class CarManageController {
    @Autowired
    private CarManageService CarManageService;

    @RequestMapping(value = "/BASE_EXAMINE_CAR_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_MM_PLANT(
            @RequestParam(value = "V_V_CARCODE") String V_V_CARCODE,
            @RequestParam(value = "V_V_CARNAME") String V_V_CARNAME,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = CarManageService.BASE_EXAMINE_CAR_SEL(V_V_CARCODE, V_V_CARNAME);
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            int endPage = (start + limit) >= total ? total : (start + limit);
            pageList = list.subList(start, endPage);
        } else {
            pageList = list;
        }
        result.put("total", total);
        result.put("list", pageList);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/BASE_EXAMINE_CAR_INS", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_EXAMINE_CAR_INS(
            @RequestParam(value = "V_V_CARCODE") String V_V_CARCODE,
            @RequestParam(value = "V_V_CARNAME") String V_V_CARNAME,
            @RequestParam(value = "V_V_CARTYPE") String V_V_CARTYPE,
            @RequestParam(value = "V_V_CARGUISUO") String V_V_CARGUISUO,
            @RequestParam(value = "V_V_CARINDATE") String V_V_CARINDATE,
            @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
            @RequestParam(value = "V_V_CARINFO") String V_V_CARINFO,
            @RequestParam(value = "V_V_DE") String V_V_DE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = CarManageService.BASE_EXAMINE_CAR_INS(V_V_CARCODE, V_V_CARNAME, V_V_CARTYPE, V_V_CARGUISUO, V_V_CARINDATE, V_V_FLAG, V_V_CARINFO, V_V_DE);
        result.put("INFO", data.get("INFO"));
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/BASE_EXAMINE_CAR_UPD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_EXAMINE_CAR_UPD(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_CARCODE") String V_V_CARCODE,
            @RequestParam(value = "V_V_CARNAME") String V_V_CARNAME,
            @RequestParam(value = "V_V_CARTYPE") String V_V_CARTYPE,
            @RequestParam(value = "V_V_CARGUISUO") String V_V_CARGUISUO,
            @RequestParam(value = "V_V_CARINDATE") String V_V_CARINDATE,
            @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
            @RequestParam(value = "V_V_CARINFO") String V_V_CARINFO,
            @RequestParam(value = "V_V_DE") String V_V_DE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = CarManageService.BASE_EXAMINE_CAR_UPD(V_V_GUID,V_V_CARCODE, V_V_CARNAME, V_V_CARTYPE, V_V_CARGUISUO, V_V_CARINDATE, V_V_FLAG, V_V_CARINFO, V_V_DE);
        result.put("INFO", data.get("INFO"));
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/BASE_EXAMINE_CAR_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_EXAMINE_CAR_DEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = CarManageService.BASE_EXAMINE_CAR_DEL(V_V_GUID);
        result.put("INFO", data.get("INFO"));
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/BASE_EXAMINE_CAR_DIS", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_EXAMINE_CAR_DIS(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = CarManageService.BASE_EXAMINE_CAR_DIS(V_V_GUID);
        result.put("INFO", data.get("INFO"));
        result.put("success", true);
        return result;
    }

    //查询司机详情
    @RequestMapping(value = "/BASE_DRIVER_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_DRIVER_SEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = CarManageService.BASE_DRIVER_SEL(V_V_GUID);
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            int endPage = (start + limit) >= total ? total : (start + limit);
            pageList = list.subList(start, endPage);
        } else {
            pageList = list;
        }
        result.put("total", total);
        result.put("list", pageList);
        result.put("success", true);
        return result;
    }

    //司机新增
    @RequestMapping(value = "/BASE_DRIVER_INS", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_DRIVER_INS(
            @RequestParam(value = "V_V_DRIVER_GUID") String V_V_DRIVER_GUID,
            @RequestParam(value = "V_V_CAR_GUID") String V_V_CAR_GUID,
            @RequestParam(value = "V_V_DRIVER_NAME") String V_V_DRIVER_NAME,
            @RequestParam(value = "V_V_WORK_DATE") String V_V_WORK_DATE,
            @RequestParam(value = "V_V_DRIVER_DE") String V_V_DRIVER_DE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = CarManageService.BASE_DRIVER_INS(V_V_DRIVER_GUID,V_V_CAR_GUID,V_V_DRIVER_NAME, V_V_WORK_DATE, V_V_DRIVER_DE);
        result.put("INFO", data.get("INFO"));
        result.put("success", true);
        return result;
    }

    //司机更新
    @RequestMapping(value = "/BASE_DRIVER_UPD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_DRIVER_UPD(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_DRIVER_NAME") String V_V_DRIVER_NAME,
            @RequestParam(value = "V_V_WORK_DATE") String V_V_WORK_DATE,
            @RequestParam(value = "V_V_DRIVER_DE") String V_V_DRIVER_DE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = CarManageService.BASE_DRIVER_UPD(V_V_GUID,V_V_DRIVER_NAME, V_V_WORK_DATE, V_V_DRIVER_DE);
        result.put("INFO", data.get("INFO"));
        result.put("success", true);
        return result;
    }

    //司机删除
    @RequestMapping(value = "/BASE_DRIVER_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_DRIVER_DEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = CarManageService.BASE_DRIVER_DEL(V_V_GUID);
        result.put("INFO", data.get("INFO"));
        result.put("success", true);
        return result;
    }

    //查询机具使用明细
    @RequestMapping(value = "/BASE_CAR_USE_DETAIL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_CAR_USE_DETAIL_SEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = CarManageService.BASE_CAR_USE_DETAIL_SEL(V_V_GUID);
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            int endPage = (start + limit) >= total ? total : (start + limit);
            pageList = list.subList(start, endPage);
        } else {
            pageList = list;
        }
        result.put("total", total);
        result.put("list", pageList);
        result.put("success", true);
        return result;
    }

    //查询机具维修明细
    @RequestMapping(value = "/BASE_CAR_REP_DETAIL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_CAR_REP_DETAIL_SEL(
            @RequestParam(value = "V_V_CAR_GUID") String V_V_CAR_GUID,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = CarManageService.BASE_CAR_REP_DETAIL_SEL(V_V_CAR_GUID);
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            int endPage = (start + limit) >= total ? total : (start + limit);
            pageList = list.subList(start, endPage);
        } else {
            pageList = list;
        }
        result.put("total", total);
        result.put("list", pageList);
        result.put("success", true);
        return result;
    }

    //传入设备编码查询关联设备信息
    @RequestMapping(value = "/BASE_EXAMINE_CAR_BYCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_EXAMINE_CAR_BYCODE_SEL(
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = CarManageService.BASE_EXAMINE_CAR_BYCODE_SEL(V_V_EQUCODE);
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            int endPage = (start + limit) >= total ? total : (start + limit);
            pageList = list.subList(start, endPage);
        } else {
            pageList = list;
        }
        result.put("total", total);
        result.put("list", pageList);
        result.put("success", true);
        return result;
    }

    //取消设备与机具关联
    @RequestMapping(value = "/BASE_EXAMINE_CAR_LINKDEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_EXAMINE_CAR_LINKDEL(
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = CarManageService.BASE_EXAMINE_CAR_LINKDEL(V_V_EQUCODE);
        result.put("INFO", data.get("INFO"));
        result.put("success", true);
        return result;
    }

    //传入设备编码查询关联设备信息
    @RequestMapping(value = "/BASE_EXAMINE_CAR_BYGUID_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_EXAMINE_CAR_BYGUID_SEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = CarManageService.BASE_EXAMINE_CAR_BYGUID_SEL(V_V_GUID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //机具示意图
    @RequestMapping(value = "/BASE_FILE_IMAGE_SEL", method = RequestMethod.GET)
    @ResponseBody
    public Map BASE_FILE_IMAGE_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                   @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                           HttpServletRequest request,
                           HttpServletResponse response) throws Exception {
        Map resultTemp= CarManageService.BASE_FILE_IMAGE_SEL(V_V_GUID,V_V_FILEGUID);
        Map result = new HashMap();
        if(resultTemp.get("O_FILE")!=null) {
            //String fileName = (String) resultTemp.get("O_FILENAME");
            InputStream fileStream = ((Blob) resultTemp.get("O_FILE")).getBinaryStream();
            BufferedInputStream reader = new BufferedInputStream(fileStream);
            BufferedOutputStream writer = new BufferedOutputStream(response.getOutputStream());
            byte[] bytes = new byte[1024 * 1024];
            int length = reader.read(bytes);
            while ((length > 0)) {
                writer.write(bytes, 0, length);
                length = reader.read(bytes);
            }
            reader.close();
            writer.close();
        }
        result.put("success",true);
        return result;
    }

    //设备类型树
    @RequestMapping(value = "/PRO_GET_DEPTEQUTYPE_PER", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> DepartAndEquTypeTree(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                          @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        List<Map> result = CarManageService.PRO_GET_DEPTEQUTYPE_PER(V_V_PERSONCODE, V_V_DEPTCODENEXT);
        return result;
    }

    @RequestMapping(value = "/PRO_SAP_PM_EQU_TREE", method = RequestMethod.POST)
    @ResponseBody
    public List<HashMap> PRO_SAP_PM_EQU_TREE(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                         @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                         @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                         @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                         @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        List<HashMap> result = CarManageService.PRO_SAP_PM_EQU_TREE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_V_EQUTYPECODE, V_V_EQUCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_SAP_PM_CHILDEQU_TREE", method = RequestMethod.POST)
    @ResponseBody
    public List<HashMap> PRO_SAP_PM_CHILDEQU_TREE(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                  @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                  @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                                  @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                  @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        List<HashMap> result = CarManageService.PRO_SAP_PM_CHILDEQU_TREE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_V_EQUTYPECODE, V_V_EQUCODE);
        return result;
    }

    //出车详情.
    @RequestMapping(value = "/BASE_DRIVEOUT_DETAIL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_DRIVEOUT_DETAIL_SEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = CarManageService.BASE_DRIVEOUT_DETAIL_SEL(V_V_GUID);
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            int endPage = (start + limit) >= total ? total : (start + limit);
            pageList = list.subList(start, endPage);
        } else {
            pageList = list;
        }
        result.put("total", total);
        result.put("list", pageList);
        result.put("success", true);
        return result;
    }
}
