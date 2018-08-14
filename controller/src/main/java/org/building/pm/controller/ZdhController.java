package org.building.pm.controller;

//import com.AMToMessService;
import org.building.pm.service.ZdhService;
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
 * <p>
 * �豸�¹�controller
 */
@Controller
@RequestMapping("/app/pm/zdh")
public class ZdhController {

    @Autowired
    private ZdhService zdhService;

    /*
    * 厂矿查询
    * */
    @RequestMapping(value = "plant_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> plant_sel(@RequestParam(value = "IS_V_DEPTCODE") String IS_V_DEPTCODE,
                                         @RequestParam(value = "IS_V_DEPTTYPE") String IS_V_DEPTTYPE,
                                         HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.plant_sel(IS_V_DEPTCODE, IS_V_DEPTTYPE);

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
        Map<String, Object> result = zdhService.dept_sel(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_DEPTTYPE);
        return result;
    }

    /*
        * 检修单位查询
        * */
    @RequestMapping(value = "fixdept_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> fixdept_sel(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                           HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.fixdept_sel(V_V_DEPTCODE);
        return result;
    }

    /*
        * 创建工单号
        * */
    @RequestMapping(value = "orderid_create", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> orderid_create(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                              @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                              @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                              @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                              HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.orderid_create(V_V_PERCODE, V_V_PERNAME, V_V_ORGCODE, V_V_DEPTCODE);
        return result;
    }

    /*
        * 工作中心查询
        * */
    @RequestMapping(value = "workcenter_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> workcenter_sel(@RequestParam(value = "V_V_DEPTREPAIRCODE") String V_V_DEPTREPAIRCODE,
                                              HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.workcenter_sel(V_V_DEPTREPAIRCODE);
        return result;
    }

    /*
  * 维修工单创建
  * */
    @RequestMapping(value = "/save_workorder", method = RequestMethod.POST)
    @ResponseBody
    public Map save_workorder(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                              @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                              @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                              @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                              @RequestParam(value = "V_V_FUNC_LOC") String V_V_FUNC_LOC,
                              @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
                              @RequestParam(value = "V_V_EQUIP_NAME") String V_V_EQUIP_NAME,
                              @RequestParam(value = "V_D_START_DATE") String V_D_START_DATE,
                              @RequestParam(value = "V_D_FINISH_DATE") String V_D_FINISH_DATE,
                              @RequestParam(value = "V_V_WBS") String V_V_WBS,
                              @RequestParam(value = "V_V_WBS_TXT") String V_V_WBS_TXT,
                              @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                              @RequestParam(value = "V_V_TOOL") String V_V_TOOL,
                              @RequestParam(value = "V_V_TECHNOLOGY") String V_V_TECHNOLOGY,
                              @RequestParam(value = "V_V_SAFE") String V_V_SAFE,
                              HttpServletRequest request,
                              HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.save_workorder(V_V_PERCODE, V_V_PERNAME, V_V_ORDERGUID, V_V_SHORT_TXT,
                V_V_FUNC_LOC, V_V_EQUIP_NO, V_V_EQUIP_NAME, V_D_START_DATE, V_D_FINISH_DATE, V_V_WBS,
                V_V_WBS_TXT, V_V_DEPTCODEREPARIR, V_V_TOOL, V_V_TECHNOLOGY, V_V_SAFE);
        test.put("list", result);
        return test;
    }

    /*
       * 区域工程师查询查询
       * */
    @RequestMapping(value = "select_engineer", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> select_engineer(@RequestParam(value = "V_V_EQUIPCODE") String V_V_EQUIPCODE,
                                               @RequestParam(value = "V_V_DEPTREPAIRCODE") String V_V_DEPTREPAIRCODE,
                                               HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.select_engineer(V_V_EQUIPCODE, V_V_DEPTREPAIRCODE);
        return result;
    }

    /*
        * 区域工程师查询查询
        * */
    @RequestMapping(value = "create_workorder", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> create_workorder(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.create_workorder(V_V_PERCODE, V_V_PERNAME, V_V_ORGCODE, V_V_DEPTCODE);
        return result;
    }

    /*
        * 工单状态查询
        * */
    @RequestMapping(value = "workorderstate_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> workorderstate_sel(
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.workorderstate_sel();
        return result;
    }


    /*
        * 设备名称查询
        * */
    @RequestMapping(value = "equipname_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> equipname_sel(@RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                             @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                             HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.equipname_sel(V_V_DEPTCODENEXT, V_V_EQUTYPECODE);
        return result;
    }

    /*
        * 设备类型查询
        * */
    @RequestMapping(value = "equiptype_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> equiptype_sel(@RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                             HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.equiptype_sel(V_V_DEPTCODENEXT);
        return result;
    }

    /*
* 维修工单查询
* */
    @RequestMapping(value = "/workorder_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map workorder_sel(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
                             @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
                             @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                             @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                             @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                             @RequestParam(value = "V_EQUTYPE_CODE") String V_EQUTYPE_CODE,
                             @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
                             @RequestParam(value = "V_DJ_PERCODE") String V_DJ_PERCODE,
                             @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                             @RequestParam(value = "V_V_BJ_TXT") String V_V_BJ_TXT,
                             @RequestParam(value = "V_V_ORDER_TYP") String V_V_ORDER_TYP,
                             @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                             @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                             HttpServletRequest request,
                             HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        Map<String, Object> result = null;
        result = zdhService.workorder_sel(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_DEPTCODEREPARIR, V_V_STATECODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE, V_V_SHORT_TXT,
                V_V_BJ_TXT, V_V_ORDER_TYP, V_V_PAGE,V_V_PAGESIZE);
        return result;
    }

    /*
 * 提交至主任
 * */
    @RequestMapping(value = "/send_manager", method = RequestMethod.POST)
    @ResponseBody
    public Map send_manager(@RequestParam(value = "V_V_DEPTREPAIRCODE") String V_V_DEPTREPAIRCODE,
                            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                            @RequestParam(value = "V_V_REASON") String V_V_REASON,
                            HttpServletRequest request,
                            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.send_manager(V_V_DEPTREPAIRCODE, V_V_ORDERGUID, V_V_REASON);
        test.put("list", result);
        return test;
    }

    /*
       * 班组查询
       * */
    @RequestMapping(value = "team_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> team_sel(@RequestParam(value = "IN_DEPARTCODE") String IN_DEPARTCODE,
                                        @RequestParam(value = "IN_CLASSNAME") String IN_CLASSNAME,
                                        HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.team_sel(IN_DEPARTCODE, IN_CLASSNAME);
        return result;
    }

    /*
       * 工作中心查询
       * */
    @RequestMapping(value = "workCenter_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> workCenter_sel(@RequestParam(value = "V_V_DEPTREPAIRCODE") String V_V_DEPTREPAIRCODE,
                                              HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.workCenter_sel(V_V_DEPTREPAIRCODE);
        return result;
    }

    /*
       * 角色查询
       * */
    @RequestMapping(value = "role_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> role_sel(HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.role_sel();
        return result;
    }

    /*
      * 角色查询
      * */
    @RequestMapping(value = "role_new_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> role_new_sel(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.role_new_sel(V_V_DEPTCODE);
        return result;
    }

    /*
       * 人员添加查询
       * */
    @RequestMapping(value = "addperson_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addperson_sel(@RequestParam(value = "IN_DEPTCODE") String IN_DEPTCODE,
                                             @RequestParam(value = "IN_ROLECODE") String IN_ROLECODE,
                                             @RequestParam(value = "IN_PERSONCODE") String IN_PERSONCODE,
                                             @RequestParam(value = "IN_PERSONNAME") String IN_PERSONNAME,
                                             @RequestParam(value = "IN_CLASSCODE") String IN_CLASSCODE,
                                             @RequestParam(value = "IN_ORDERGUID") String IN_ORDERGUID,
                                             HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.addperson_sel(IN_DEPTCODE, IN_ROLECODE, IN_PERSONCODE, IN_PERSONNAME,IN_CLASSCODE,IN_ORDERGUID);
        return result;
    }

    /*
       * 人员添加查询
       * */
    @RequestMapping(value = "addbaseperson_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addbaseperson_sel(@RequestParam(value = "IN_DEPTCODE") String IN_DEPTCODE,
                                             @RequestParam(value = "IN_ROLECODE") String IN_ROLECODE,
                                             @RequestParam(value = "IN_PERSONCODE") String IN_PERSONCODE,
                                             @RequestParam(value = "IN_PERSONNAME") String IN_PERSONNAME,
                                             HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.addbaseperson_sel(IN_DEPTCODE, IN_ROLECODE, IN_PERSONCODE, IN_PERSONNAME);
        return result;
    }

    /*
       * 班组详情查询
       * */
    @RequestMapping(value = "teamdetail_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> teamdetail_sel(@RequestParam(value = "IN_CLASSCODE") String IN_CLASSCODE,
                                              @RequestParam(value = "IN_ORDERGUID") String IN_ORDERGUID,
                                              HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.teamdetail_sel(IN_CLASSCODE,IN_ORDERGUID);
        return result;
    }

    /*
       * 班组名称查询
       * */
    @RequestMapping(value = "teamname_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> teamname_sel(@RequestParam(value = "IN_CLASSCODE") String IN_CLASSCODE,
                                              HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.teamname_sel(IN_CLASSCODE);
        return result;
    }

    /*
      * 班组详情查询
      * */
    @RequestMapping(value = "teambasedetail_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> teambasedetail_sel(@RequestParam(value = "IN_CLASSCODE") String IN_CLASSCODE,
                                              HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.teambasedetail_sel(IN_CLASSCODE);
        return result;
    }

    /*
* 新增班组
* */
    @RequestMapping(value = "/team_save", method = RequestMethod.POST)
    @ResponseBody
    public Map team_save(@RequestParam(value = "IN_DEPARTCODE") String IN_DEPARTCODE,
                         @RequestParam(value = "IN_CLASSNAME") String IN_CLASSNAME,
                         @RequestParam(value = "IN_WORKCODE") String IN_WORKCODE,
                         @RequestParam(value = "IN_PERSONCODE") String IN_PERSONCODE,
                         HttpServletRequest request,
                         HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.team_save(IN_DEPARTCODE, IN_CLASSNAME, IN_WORKCODE, IN_PERSONCODE);
        test.put("list", result);
        return test;
    }

    /*
* 新增班组
* */
    @RequestMapping(value = "/teambase_save", method = RequestMethod.POST)
    @ResponseBody
    public Map teambase_save(@RequestParam(value = "IN_DEPARTCODE") String IN_DEPARTCODE,
                         @RequestParam(value = "IN_CLASSNAME") String IN_CLASSNAME,
                         @RequestParam(value = "IN_WORKCODE") String IN_WORKCODE,
                         @RequestParam(value = "IN_PERSONCODE") String IN_PERSONCODE,
                         HttpServletRequest request,
                         HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.teambase_save(IN_DEPARTCODE, IN_CLASSNAME, IN_WORKCODE, IN_PERSONCODE);
        test.put("list", result);
        return test;
    }

    /*
* 修改班组
* */
    @RequestMapping(value = "/team_edit", method = RequestMethod.POST)
    @ResponseBody
    public Map team_edit(@RequestParam(value = "IN_CLASSCODE") String IN_CLASSCODE,
                         @RequestParam(value = "IN_DEPARTCODE") String IN_DEPARTCODE,
                         @RequestParam(value = "IN_CLASSNAME") String IN_CLASSNAME,
                         @RequestParam(value = "IN_WORKCODE") String IN_WORKCODE,
                         @RequestParam(value = "IN_PERSONCODE") String IN_PERSONCODE,
                         @RequestParam(value = "IN_ORDERGUID") String IN_ORDERGUID,
                         HttpServletRequest request,
                         HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.team_edit(IN_CLASSCODE, IN_DEPARTCODE, IN_CLASSNAME, IN_WORKCODE, IN_PERSONCODE,IN_ORDERGUID);
        test.put("list", result);
        return test;
    }

    /*
* 修改班组
* */
    @RequestMapping(value = "/teambase_edit", method = RequestMethod.POST)
    @ResponseBody
    public Map teambase_edit(@RequestParam(value = "IN_CLASSCODE") String IN_CLASSCODE,
                         @RequestParam(value = "IN_DEPARTCODE") String IN_DEPARTCODE,
                         @RequestParam(value = "IN_CLASSNAME") String IN_CLASSNAME,
                         @RequestParam(value = "IN_WORKCODE") String IN_WORKCODE,
                         @RequestParam(value = "IN_PERSONCODE") String IN_PERSONCODE,
                         HttpServletRequest request,
                         HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.teambase_edit(IN_CLASSCODE, IN_DEPARTCODE, IN_CLASSNAME, IN_WORKCODE, IN_PERSONCODE);
        test.put("list", result);
        return test;
    }

    /*
       * 班组修改查询查询
       * */
    @RequestMapping(value = "teamedit_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> teamedit_sel(@RequestParam(value = "IN_CLASSCODE") String IN_CLASSCODE,
                                            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.teamedit_sel(IN_CLASSCODE);
        return result;
    }

    /*
* 修改班组
* */
    @RequestMapping(value = "/team_del", method = RequestMethod.POST)
    @ResponseBody
    public Map team_del(@RequestParam(value = "IN_CLASSCODE") String IN_CLASSCODE,
                        HttpServletRequest request,
                        HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.team_del(IN_CLASSCODE);
        test.put("list", result);
        return test;
    }

    /*
 * 分配给班组
 * */
    @RequestMapping(value = "/send_team", method = RequestMethod.POST)
    @ResponseBody
    public Map send_team(@RequestParam(value = "V_V_TEAMCODE") String V_V_TEAMCODE,
                         @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                         HttpServletRequest request,
                         HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.send_team(V_V_TEAMCODE, V_V_ORDERGUID);
        test.put("list", result);
        return test;
    }

    /*
* 维修工单（管理员）查询
* */
    @RequestMapping(value = "/workorderall_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map workorderall_sel(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
                                @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
                                @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                @RequestParam(value = "V_EQUTYPE_CODE") String V_EQUTYPE_CODE,
                                @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
                                @RequestParam(value = "V_DJ_PERCODE") String V_DJ_PERCODE,
                                @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                @RequestParam(value = "V_V_BJ_TXT") String V_V_BJ_TXT,
                                @RequestParam(value = "V_V_ORDER_TYP") String V_V_ORDER_TYP,
                                @RequestParam(value = "V_V_USERCODE") String V_V_USERCODE,
                                HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        Map<String, Object> result = null;
        result = zdhService.workorderall_sel(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_DEPTCODEREPARIR, V_V_STATECODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE, V_V_SHORT_TXT,
                V_V_BJ_TXT, V_V_ORDER_TYP, V_V_USERCODE);
        return result;
    }

    /*
      * 编辑物料
      * */
    @RequestMapping(value = "PRO_PM_WORKORDER_ET_ACTIVITY", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_ET_ACTIVITY(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_PM_WORKORDER_ET_ACTIVITY(V_V_ORDERGUID);


        //System.out.println(result.get("list").);
       // for( int i =0;i<result.)

        return result;
    }

    /*
      * 物料加载
      * */
    @RequestMapping(value = "PRO_PM_WORKORDER_SPARE_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_SPARE_VIEW(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                           HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_PM_WORKORDER_SPARE_VIEW(V_V_ORDERGUID);

        int fujianCount;
        List<Map<String, Object>> list  = (List)result.get("list");
        for(Map<String,Object> fujian : list)
        {
            if((String)fujian.get("V_GUID") == null)
            {
                fujianCount = 0;
                fujian.put("FUJIAN_COUNT",fujianCount);
            }else{
                String V_V_GUID = (String)fujian.get("V_GUID");
                String V_V_FILETYPECODE = "SBGZ";
                HashMap data = zdhService.PRO_BASE_FILE_SEL(V_V_GUID, V_V_FILETYPECODE);
                List<Map<String, Object>> fujianlist = (List) data.get("list");
                fujianCount = fujianlist.size();
                fujian.put("FUJIAN_COUNT",fujianCount);
            }
        }
        result.put("list",list);
        /*for(int i =0;i < a.size(); i++)
        {
            if(a.get(i).get("V_GUID") == null)
            {
                System.out.println("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            }
        }*/

        return result;
    }

    /*
     * 物料使用相关情况
     * */
    @RequestMapping(value = "PRO_WORKORDER_SPARE_ZY", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_WORKORDER_SPARE_ZY(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                      HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_WORKORDER_SPARE_ZY(V_V_ORDERGUID);
        return result;
    }

    /*
    * 库房查询
    * */
    @RequestMapping(value = "PRO_MM_STORE_DIC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_MM_STORE_DIC(
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_MM_STORE_DIC();
        return result;
    }

    /*
    * 机旁备件 显视列表
    * */
    @RequestMapping(value = "PRO_PM_WORKORDER_JIP_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_JIP_VIEW(@RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
                                                         @RequestParam(value = "V_I_FLAG") String V_I_FLAG,
                                                         HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_PM_WORKORDER_JIP_VIEW(V_V_EQUIP_NO, V_I_FLAG);
        return result;
    }

    /*
    * 机旁备件 显视列表
    * */
    @RequestMapping(value = "PRO_BASE_DEPT_SAP_JHGC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_SAP_JHGC(@RequestParam(value = "V_V_SAP_JHGC") String V_V_SAP_JHGC,
                                                      HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_BASE_DEPT_SAP_JHGC(V_V_SAP_JHGC);
        return result;
    }

    /*
* 维修工单（维修人员）查询
* */
    @RequestMapping(value = "/workorder_membersel", method = RequestMethod.POST)
    @ResponseBody
    public Map workorder_membersel(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
                                   @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
                                   @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                   @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                   @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                   @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                   @RequestParam(value = "V_EQUTYPE_CODE") String V_EQUTYPE_CODE,
                                   @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
                                   @RequestParam(value = "V_DJ_PERCODE") String V_DJ_PERCODE,
                                   @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                   @RequestParam(value = "V_V_BJ_TXT") String V_V_BJ_TXT,
                                   @RequestParam(value = "V_V_ORDER_TYP") String V_V_ORDER_TYP,
                                   @RequestParam(value = "V_V_USERCODE") String V_V_USERCODE,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        Map<String, Object> result = null;
        result = zdhService.workorder_membersel(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_DEPTCODEREPARIR, V_V_STATECODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE, V_V_SHORT_TXT,
                V_V_BJ_TXT, V_V_ORDER_TYP, V_V_USERCODE);
        return result;
    }

    /*
     * 工单任务查询
     * */
    @RequestMapping(value = "PRO_PM_WORKORDER_ET_OPERATIONS", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_ET_OPERATIONS(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                              HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_PM_WORKORDER_ET_OPERATIONS(V_V_ORDERGUID);
        return result;
    }

    /*
  * 任务创建
  * */
    @RequestMapping(value = "/PRO_PM_WORKORDER_ET_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_WORKORDER_ET_SET(@RequestParam(value = "V_I_ID") Double V_I_ID,
                                       @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                       @RequestParam(value = "V_V_DESCRIPTION") String V_V_DESCRIPTION,
                                       @RequestParam(value = "V_I_WORK_ACTIVITY") Double V_I_WORK_ACTIVITY,
                                       @RequestParam(value = "V_I_DURATION_NORMAL") Double V_I_DURATION_NORMAL,
                                       @RequestParam(value = "V_V_WORK_CENTER") String V_V_WORK_CENTER,
                                       @RequestParam(value = "V_I_ACTUAL_TIME") Double V_I_ACTUAL_TIME,
                                       @RequestParam(value = "V_I_NUMBER_OF_PEOPLE") Double V_I_NUMBER_OF_PEOPLE,
                                       @RequestParam(value = "V_V_ID") String V_V_ID,
                                       @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.PRO_PM_WORKORDER_ET_SET(V_I_ID, V_V_ORDERGUID, V_V_DESCRIPTION,
                V_I_WORK_ACTIVITY, V_I_DURATION_NORMAL, V_V_WORK_CENTER,
                V_I_ACTUAL_TIME, V_I_NUMBER_OF_PEOPLE, V_V_ID,V_V_GUID);
        test.put("list", result);
        return test;
    }

    /*
     * 工单任务查询
     * */
    @RequestMapping(value = "PRO_PM_WORKORDER_ET_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_ET_GET(@RequestParam(value = "V_I_ID") Double V_I_ID,
                                                       HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_PM_WORKORDER_ET_GET(V_I_ID);
        return result;
    }

    /*
 * 任务创建
 * */
    @RequestMapping(value = "/PRO_PM_WORKORDER_ET_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_WORKORDER_ET_DEL(@RequestParam(value = "V_I_ID") Double V_I_ID,
                                       @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.PRO_PM_WORKORDER_ET_DEL(V_I_ID, V_V_ORDERGUID);
        test.put("list", result);
        return test;
    }

    /*
     * 工单查询(GUID)
     * */
    @RequestMapping(value = "PRO_PM_WORKORDER_GET", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_PM_WORKORDER_GET(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                    HttpServletRequest request)
            throws SQLException {
        List<Map> result = zdhService.PRO_PM_WORKORDER_GET(V_V_ORDERGUID);
        return result;
    }

    /*
     *
     * */
    @RequestMapping(value = "PRO_BASE_DEPT_TREE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_TREE(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                  HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_BASE_DEPT_TREE(V_V_DEPTCODE);
        return result;
    }

    /*
   *
   * */
    @RequestMapping(value = "PRO_BASE_CRAFT_QUERY", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_CRAFT_QUERY(
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_BASE_CRAFT_QUERY();
        return result;
    }

    /*
     *
     * */
    @RequestMapping(value = "PRO_BASE_DEPTCLASS", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPTCLASS(@RequestParam(value = "V_V_DEPTREPAIRCODE") String V_V_DEPTREPAIRCODE,
                                                  HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_BASE_DEPTCLASS(V_V_DEPTREPAIRCODE);
        return result;
    }

    /*
     *
     * */
    @RequestMapping(value = "PRO_BASE_PERSON_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_PERSON_VIEW(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                    HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_BASE_PERSON_VIEW(V_V_DEPTCODE);
        return result;
    }

    /*
 *
 * */
    @RequestMapping(value = "/PRO_BASE_PERSON_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_PERSON_SET(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                   @RequestParam(value = "V_V_PERSONNAME") String V_V_PERSONNAME,
                                   @RequestParam(value = "V_V_LOGINNAME") String V_V_LOGINNAME,
                                   @RequestParam(value = "V_V_PASSWORD") String V_V_PASSWORD,
                                   @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                   @RequestParam(value = "V_V_ROLECODE") String V_V_ROLECODE,
                                   @RequestParam(value = "V_I_ORDERID") Double V_I_ORDERID,
                                   @RequestParam(value = "V_I_CLASS") String V_I_CLASS,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.PRO_BASE_PERSON_SET(V_V_PERSONCODE, V_V_PERSONNAME,V_V_LOGINNAME,V_V_PASSWORD,
                V_V_DEPTCODE,V_V_ROLECODE,V_I_ORDERID,V_I_CLASS);
        test.put("list", result);
        return test;
    }

    /*
     *
     * */
    @RequestMapping(value = "PRO_BASE_PERSON_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_PERSON_GET(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                    HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_BASE_PERSON_GET(V_V_PERSONCODE);
        return result;
    }

    /*
*
* */
    @RequestMapping(value = "/PRO_BASE_PERSON_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_PERSON_DEL(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.PRO_BASE_PERSON_DEL(V_V_PERSONCODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PERSON_ADD_CRAFT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PERSON_ADD_CRAFT(@RequestParam(value = "IN_CRAFTCODE") String IN_CRAFTCODE,
                                    @RequestParam(value = "IN_PERSONCODE") String IN_PERSONCODE,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.PRO_PERSON_ADD_CRAFT(IN_CRAFTCODE,IN_PERSONCODE);
        test.put("list", result);
        return test;
    }

    /*
     *
     * */
    @RequestMapping(value = "PRO_PERSON_QUERY_CRAFT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PERSON_QUERY_CRAFT(@RequestParam(value = "IN_PERSON") String IN_PERSON,
                                                   HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_PERSON_QUERY_CRAFT(IN_PERSON);
        return result;
    }

    @RequestMapping(value = "/PRO_PERSON_DELETE_CRAFT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PERSON_DELETE_CRAFT(
                                    @RequestParam(value = "IN_PERSONCODE") String IN_PERSONCODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.PRO_PERSON_DELETE_CRAFT(IN_PERSONCODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_BASE_POSTTOPERSON_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_POSTTOPERSON_SET(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_POSTCODE") String V_V_POSTCODE,
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.PRO_BASE_POSTTOPERSON_SET(V_V_ORGCODE,V_V_POSTCODE,V_V_PERSONCODE,V_V_TYPE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/order_issued", method = RequestMethod.POST)
    @ResponseBody
    public Map order_issued(
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.order_issued(V_V_ORDERGUID);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/order_accept", method = RequestMethod.POST)
    @ResponseBody
    public Map order_accept(
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.order_accept(V_V_ORDERGUID);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/order_finalaccept", method = RequestMethod.POST)
    @ResponseBody
    public Map order_finalaccept(
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.order_finalaccept(V_V_ORDERGUID);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    @ResponseBody
    public  Map uploadFile(@RequestParam(value = "upload") MultipartFile upload,
                           @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                           @RequestParam(value = "V_V_MATERIALGUID") String V_V_MATERIALGUID,
                           @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
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
        result = zdhService.WX_INF_FILE_SET(V_V_ORDERGUID,V_V_MATERIALGUID, V_V_FILEGUID, filename, filedata,
                 V_V_FILEPER, V_V_FILETIME);
        test.put("list", result);
        test.put("success", true);
        return test;
    }

    /*
    * 附件查询
    * */
    @RequestMapping(value = "WX_INF_FILE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> WX_INF_FILE_SEL(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                               @RequestParam(value = "V_V_MATERIALGUID") String V_V_MATERIALGUID,
                                               @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
                                               HttpServletRequest request)
            throws SQLException, UnsupportedEncodingException {
        Map<String, Object> result = zdhService.WX_INF_FILE_SEL(V_V_ORDERGUID, V_V_MATERIALGUID,V_V_FILENAME);
        return result;
    }

    @RequestMapping(value = "/downloadFile", method = RequestMethod.GET)
    @ResponseBody
    public  void downloadFile(@RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                             @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
                             HttpServletRequest request,HttpServletResponse response, ModelMap model) throws Exception {

        List<Map> result = null;
        result = zdhService.WX_ORDER_FILE_GET(V_V_FILEGUID);
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

    }
    /*
 * 附件删除
 * */
    @RequestMapping(value = "/WX_ORDER_FILE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map WX_ORDER_FILE_DEL(@RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                               HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.WX_ORDER_FILE_DEL(V_V_FILEGUID);
        test.put("list", result);
        return test;
    }

    /*
* 物料删除
* */
    @RequestMapping(value = "/PRO_PM_WORKORDER_SPARE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_WORKORDER_SPARE_DEL(@RequestParam(value = "V_I_ID") String V_I_ID,
                                 HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.PRO_PM_WORKORDER_SPARE_DEL(V_I_ID);
        test.put("list", result);
        return test;
    }

    /*
* 物料保存
* */
    @RequestMapping(value = "/PRO_PM_WORKORDER_SPARE_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_WORKORDER_SPARE_SET(@RequestParam(value = "V_I_ID") Double V_I_ID,
                                          @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                          @RequestParam(value = "V_V_FETCHORDERGUID") String V_V_FETCHORDERGUID,
                                          @RequestParam(value = "V_V_ACTIVITY") String V_V_ACTIVITY,
                                          @RequestParam(value = "V_V_MATERIALCODE") String V_V_MATERIALCODE,
                                          @RequestParam(value = "V_V_MATERIALNAME") String V_V_MATERIALNAME,
                                          @RequestParam(value = "V_V_SPEC") String V_V_SPEC,
                                          @RequestParam(value = "V_V_UNIT") String V_V_UNIT,
                                          @RequestParam(value = "V_F_UNITPRICE") Double V_F_UNITPRICE,
                                          @RequestParam(value = "V_I_PLANAMOUNT") Double V_I_PLANAMOUNT,
                                          @RequestParam(value = "V_F_PLANMONEY") Double V_F_PLANMONEY,
                                          @RequestParam(value = "V_I_ACTUALAMOUNT") Double V_I_ACTUALAMOUNT,
                                          @RequestParam(value = "V_F_ACTUALMONEY") Double V_F_ACTUALMONEY,
                                          @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
                                          @RequestParam(value = "V_V_MEMO") String V_V_MEMO,
                                          @RequestParam(value = "V_V_SUBTYPE") String V_V_SUBTYPE,
                                          @RequestParam(value = "V_V_STATUS") String V_V_STATUS,
                                          @RequestParam(value = "V_I_ABANDONEDAMOUNT") Double V_I_ABANDONEDAMOUNT,
                                          @RequestParam(value = "V_I_RECLAIMEDAMOUNT") Double V_I_RECLAIMEDAMOUNT,
                                          @RequestParam(value = "V_I_FIXEDAMOUNT") Double V_I_FIXEDAMOUNT,
                                          @RequestParam(value = "V_V_ID") String V_V_ID,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.PRO_PM_WORKORDER_SPARE_SET(V_I_ID,V_V_ORDERGUID,V_V_FETCHORDERGUID,V_V_ACTIVITY,V_V_MATERIALCODE,
                V_V_MATERIALNAME,V_V_SPEC,V_V_UNIT,V_F_UNITPRICE,V_I_PLANAMOUNT,V_F_PLANMONEY,V_I_ACTUALAMOUNT,V_F_ACTUALMONEY,
                V_V_TYPE,V_V_MEMO,V_V_SUBTYPE,V_V_STATUS,V_I_ABANDONEDAMOUNT,V_I_RECLAIMEDAMOUNT,V_I_FIXEDAMOUNT,V_V_ID);
        test.put("list", result);
        return test;
    }

    /*
*
* */
    @RequestMapping(value = "/PRO_PM_PRELOADWARE_SELECT_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_PRELOADWARE_SELECT_SET(@RequestParam(value = "V_I_ID") String V_I_ID,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.PRO_PM_PRELOADWARE_SELECT_SET(V_I_ID);
        test.put("list", result);
        return test;
    }

    /*
*
* */
    @RequestMapping(value = "/PRO_PM_WORKORDER_JIP_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_WORKORDER_JIP_SELECT(@RequestParam(value = "V_I_ID") String V_I_ID,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.PRO_PM_WORKORDER_JIP_SELECT(V_I_ID);
        test.put("list", result);
        return test;
    }


    /*
     *
     * */
    @RequestMapping(value = "PRO_WORKORDER_SPARE_ZY_ITEM", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_WORKORDER_SPARE_ZY_ITEM(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                           @RequestParam(value = "V_V_MATERIALCODE") String V_V_MATERIALCODE,
                                                      HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_WORKORDER_SPARE_ZY_ITEM(V_V_ORDERGUID,V_V_MATERIALCODE);
        return result;
    }



    /*
     *
     * */
    @RequestMapping(value = "PRO_WX_WORKORDER_OTHER_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_WX_WORKORDER_OTHER_SEL(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                           HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_WX_WORKORDER_OTHER_SEL(V_V_ORDERGUID);
        return result;
    }

    /*
*
* */
    @RequestMapping(value = "/PRO_WX_WORKORDER_OTHER_SAVE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WX_WORKORDER_OTHER_SAVE(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                           @RequestParam(value = "D_DATE_ACP") String D_DATE_ACP,
                                           @RequestParam(value = "D_DATE_OVERDUE") String D_DATE_OVERDUE,
                                           @RequestParam(value = "V_REASON_OVERDUE") String V_REASON_OVERDUE,
                                           @RequestParam(value = "V_FIX_EXPLAIN") String V_FIX_EXPLAIN,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.PRO_WX_WORKORDER_OTHER_SAVE(V_V_ORDERGUID,D_DATE_ACP,D_DATE_OVERDUE,V_REASON_OVERDUE,
                V_FIX_EXPLAIN);
        test.put("list", result);
        return test;
    }

    /*
    * 预留工单查询
    * */
    @RequestMapping(value = "/workorderbooked_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map workorderbooked_sel(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
                                @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
                                @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                @RequestParam(value = "V_EQUTYPE_CODE") String V_EQUTYPE_CODE,
                                @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
                                @RequestParam(value = "V_DJ_PERCODE") String V_DJ_PERCODE,
                                @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                @RequestParam(value = "V_V_BJ_TXT") String V_V_BJ_TXT,
                                @RequestParam(value = "V_V_ORDER_TYP") String V_V_ORDER_TYP,
                                @RequestParam(value = "V_V_USERCODE") String V_V_USERCODE,
                                HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        Map<String, Object> result = null;
        result = zdhService.workorderbooked_sel(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_DEPTCODEREPARIR, V_V_STATECODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE, V_V_SHORT_TXT,
                V_V_BJ_TXT, V_V_ORDER_TYP, V_V_USERCODE);
        return result;
    }

    @RequestMapping(value = "/order_booked", method = RequestMethod.POST)
    @ResponseBody
    public Map order_booked(
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.order_booked(V_V_ORDERGUID);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/order_book", method = RequestMethod.POST)
    @ResponseBody
    public Map order_book(
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.order_book(V_V_ORDERGUID);
        test.put("list", result);
        return test;
    }

    /*
    * 厂矿查询(班长)
    * */
    @RequestMapping(value = "pertodept_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pertodept_sel(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                         HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.pertodept_sel(V_V_PERCODE);
        return result;
    }

    /*
   * 厂矿查询(班长)
   * */
    @RequestMapping(value = "pertoplan_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pertoplan_sel(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                             HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.pertoplan_sel(V_V_DEPTCODE);
        return result;
    }


    @RequestMapping(value = "/PRO_PM_WORKORDER_SEND_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_WORKORDER_SEND_UPDATE(
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            @RequestParam(value = "V_V_SEND_STATE") String V_V_SEND_STATE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.PRO_PM_WORKORDER_SEND_UPDATE(V_V_ORDERGUID,V_V_SEND_STATE);
        test.put("list", result);
        return test;
    }

    /*
* 检查工单是否下单
* */
    @RequestMapping(value = "/PRO_PM_WORKORDER_SENDSTATE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_WORKORDER_SENDSTATE_SEL(
                                       @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.PRO_PM_WORKORDER_SENDSTATE_SEL(V_V_ORDERGUID);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_SENDSTATE_E", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_WORKORDER_SENDSTATE_E(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = zdhService.PRO_PM_WORKORDER_SENDSTATE_E(V_V_ORDERGUID);
        test.put("list", result);
        return test;
    }

  /*  @RequestMapping(value = "/MessageSend", method = RequestMethod.POST)
    @ResponseBody
    public Map MessageSend(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = zdhService.PRO_WX_WORKORDER_PERGET(V_V_ORDERGUID);
        String results = null;
        try {
            String usercode = (String) result.get(0).get("V_INFO");
            AMToMessService ser = new AMToMessService();
            System.out.println("---------------------------------1----------------------------------------------");
            results = ser.AMToMessIFCheck("<SendMessage><AM_Name>" + usercode + "</AM_Name><UserId></UserId><Type>即时通</Type><Access></Access><EMail></EMail><IsBack></IsBack><IsEncrypt></IsEncrypt><ISPriority></ISPriority><Ohter1></Ohter1><Ohter2></Ohter2><PhoneNum></PhoneNum><MessageTxt></MessageTxt><SystemName>AKSB</SystemName></SendMessage>", "http://10.101.9.43:8081/pm/app/pm/page/login/login.html");
            System.out.println("----------------------------------2---------------------------------------------");
        } catch (Exception e) {
            e.printStackTrace();
        }
        test.put("list", results);
        return test;
    }*/
    @RequestMapping(value = "/PM_1917_JXGX_WL_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_WL_DATA_SET(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_KFNAME") String V_V_KFNAME,
            @RequestParam(value = "V_V_WLCODE") String V_V_WLCODE,
            @RequestParam(value = "V_V_WLSM") String V_V_WLSM,
            @RequestParam(value = "V_V_GGXH") String V_V_GGXH,
            @RequestParam(value = "V_V_JLDW") String V_V_JLDW,
            @RequestParam(value = "V_V_PRICE") String V_V_PRICE,
            @RequestParam(value = "V_V_NUM") String V_V_NUM,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = zdhService.PM_1917_JXGX_WL_DATA_SET(V_V_JXGX_CODE, V_V_KFNAME, V_V_WLCODE,V_V_WLSM,V_V_GGXH,V_V_JLDW,V_V_PRICE,V_V_NUM);
        return test;
    }
    @RequestMapping(value = "/PM_1917_JXGX_WL_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_1917_JXGX_WL_DATA_SEL(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response)throws SQLException {
        Map list= zdhService.PM_1917_JXGX_WL_DATA_SEL(V_V_JXGX_CODE);

        return list;
    }
    @RequestMapping(value = "/PM_1917_JXGX_WL_DATA_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_WL_DATA_DEL(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_WLCODE") String V_V_WLCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = zdhService.PM_1917_JXGX_WL_DATA_DEL(V_V_JXGX_CODE,V_V_WLCODE);
        return test;
    }
    @RequestMapping(value = "/PM_1917_JXGX_WL_USENUM_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_WL_DATA_DEL(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_WLCODE") String V_V_WLCODE,
            @RequestParam(value = "V_V_NUM") String V_V_NUM,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = zdhService.PM_1917_JXGX_WL_USENUM_SET(V_V_JXGX_CODE, V_V_WLCODE,V_V_NUM);
        return test;
    }

    @RequestMapping(value = "/PRO_WO_FLOW_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WO_FLOW_DATA_SEL(
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_D_BEGINTIME") String V_D_BEGINTIME,
            @RequestParam(value = "V_D_ENDTIME") String V_D_ENDTIME,
            @RequestParam(value = "V_V_GDH") String  V_V_GDH,
            @RequestParam(value = "V_V_FLOWTYPE") String  V_V_FLOWTYPE,
            @RequestParam(value = "V_I_PAGE") Integer V_I_PAGE,
            @RequestParam(value = "V_I_PAGENUMBER") Integer V_I_PAGENUMBER,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap result = zdhService.PRO_WO_FLOW_DATA_SEL(V_V_PERCODE,V_D_BEGINTIME,V_D_ENDTIME,V_V_GDH,V_V_FLOWTYPE,V_I_PAGE,V_I_PAGENUMBER);
        return result;
    }
    @RequestMapping(value = "/PRO_WO_FLOW_DATA_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WO_FLOW_DATA_VIEW(
            @RequestParam(value = "V_V_DBGUID") String V_V_DBGUID,
            @RequestParam(value = "V_I_PAGE") Integer V_I_PAGE,
            @RequestParam(value = "V_I_PAGENUMBER") Integer V_I_PAGENUMBER,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap result = zdhService.PRO_WO_FLOW_DATA_VIEW(V_V_DBGUID, V_I_PAGE, V_I_PAGENUMBER);
        return result;
    }
    @RequestMapping(value = "/PRO_WO_FLOW_AGREE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WO_FLOW_AGREE(
            @RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
            @RequestParam(value = "V_V_DBGUID") String V_V_DBGUID,
            @RequestParam(value = "V_V_IDEA") String V_V_IDEA,
            @RequestParam(value = "V_V_FLOWSTEP") String V_V_FLOWSTEP,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap result = zdhService.PRO_WO_FLOW_AGREE(V_V_ORDERID, V_V_DBGUID, V_V_IDEA,V_V_FLOWSTEP);
        return result;
    }
    @RequestMapping(value = "/PRO_WO_FLOW_EQU_DISAGREE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WO_FLOW_EQU_DISAGREE(
            @RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
            @RequestParam(value = "V_V_DBGUID") String V_V_DBGUID,
            @RequestParam(value = "V_V_IDEA") String V_V_IDEA,
            @RequestParam(value = "V_V_FLOWSTEP") String V_V_FLOWSTEP,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap result = zdhService.PRO_WO_FLOW_EQU_DISAGREE(V_V_ORDERID, V_V_DBGUID, V_V_IDEA, V_V_FLOWSTEP);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_REPAIRDEPT_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_REPAIRDEPT_VIEW(
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap result = zdhService.PRO_PM_REPAIRDEPT_VIEW(V_V_DEPTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_WO_FLOW_EQU_AGREE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WO_FLOW_EQU_AGREE(
            @RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
            @RequestParam(value = "V_V_DBGUID") String V_V_DBGUID,
            @RequestParam(value = "V_V_IDEA") String V_V_IDEA,
            @RequestParam(value = "V_V_FLOWSTEP") String V_V_FLOWSTEP,
            @RequestParam(value = "V_V_REPAIRCODE") String V_V_REPAIRCODE,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap result = zdhService.PRO_WO_FLOW_EQU_AGREE(V_V_ORDERID, V_V_DBGUID, V_V_IDEA, V_V_FLOWSTEP,V_V_REPAIRCODE,V_V_PERCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_WO_FLOW_EQU_insertdb", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WO_FLOW_EQU_insertdb(
            @RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
            @RequestParam(value = "V_V_FLOWSTEP") String V_V_FLOWSTEP,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap result = zdhService.PRO_WO_FLOW_EQU_insertdb(V_V_ORDERID, V_V_FLOWSTEP, V_V_DEPTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_WO_FLOW_EQU_CANCEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WO_FLOW_EQU_CANCEL(
            @RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap result = zdhService.PRO_WO_FLOW_EQU_CANCEL(V_V_ORDERID);
        return result;
    }

    @RequestMapping(value = "/PRO_WORKORDER_FLOW_CLASS", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WORKORDER_FLOW_CLASS(
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            @RequestParam(value = "V_V_DBGUID") String V_V_DBGUID,
            @RequestParam(value = "V_V_IDEA") String V_V_IDEA,
            @RequestParam(value = "V_V_CLASS") String V_V_CLASS,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap result = zdhService.PRO_WORKORDER_FLOW_CLASS(V_V_ORDERGUID,V_V_DBGUID,V_V_IDEA,V_V_CLASS);
        return result;
    }

    /*
 * 工单查询(GUID)
 * */
    @RequestMapping(value = "PRO_WX_WORKORDER_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_WX_WORKORDER_GET(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                    HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = zdhService.PRO_WX_WORKORDER_GET(V_V_ORDERGUID);
        return result;
    }
}
