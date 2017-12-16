package org.building.pm.controller;

import org.building.pm.service.YSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/10/31.
 */
@Controller
@RequestMapping("/app/pm/YS")
public class YSController {
    @Autowired
    private YSService ysService;

    @RequestMapping(value = "ys_report_charge_sel", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> ys_report_charge_sel(Integer V_I_YEAR, Integer V_I_MONTH, String V_DEPTCODE, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                    HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.ys_report_charge_sel(V_I_YEAR, V_I_MONTH, V_DEPTCODE);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "ys_report_charge_dept_sel", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> ys_report_charge_dept_sel(Integer V_I_YEAR, Integer V_I_MONTH, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                         HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.ys_report_charge_dept_sel(V_I_YEAR, V_I_MONTH);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/ys_report_charge_ck_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> ys_report_charge_ck_sel(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = ysService.ys_report_charge_ck_sel();

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }


    @RequestMapping(value = "ys_report_charge_cost_sel", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> ys_report_charge_cost_sel(Integer V_I_YEAR, Integer V_I_MONTH, String V_CHARGECODE, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                         HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.ys_report_charge_cost_sel(V_I_YEAR, V_I_MONTH, V_CHARGECODE);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/ys_charge_workorder_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> ys_charge_workorder_sel(String V_V_ORDERID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = ysService.ys_charge_workorder_sel(V_V_ORDERID);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "ys_charge_workorder_day_sel", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> ys_charge_workorder_day_sel(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E, String V_V_ORGCODE, String V_V_DEPTCODE, String V_EQUTYPE_CODE,
                                                           String V_EQU_CODE, String V_DJ_PERCODE, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                           HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.ys_charge_workorder_day_sel(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "ys_charge_workorder_month_sel", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> ys_charge_workorder_month_sel(String V_D_ENTER_YEAR, String V_D_ENTER_MONTH, String V_V_ORGCODE, String V_V_DEPTCODE, String V_EQUTYPE_CODE,
                                                             String V_EQU_CODE, String V_DJ_PERCODE, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                             HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.ys_charge_workorder_month_sel(V_D_ENTER_YEAR, V_D_ENTER_MONTH, V_V_ORGCODE, V_V_DEPTCODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "ys_charge_workorder_year_sel", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> ys_charge_workorder_year_sel(String V_D_ENTER_YEAR, String V_V_ORGCODE, String V_V_DEPTCODE, String V_EQUTYPE_CODE,
                                                            String V_EQU_CODE, String V_DJ_PERCODE, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                            HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.ys_charge_workorder_year_sel(V_D_ENTER_YEAR, V_V_ORGCODE, V_V_DEPTCODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/YS_CHARGE_WORKORDER_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> YS_CHARGE_WORKORDER_SET(@RequestParam(value = "V_I_IP") String V_I_IP, @RequestParam(value = "V_USERCODE") String V_USERCODE,
                                                       @RequestParam(value = "V_USERNAME") String V_USERNAME, @RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
                                                       HttpServletRequest request, HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = ysService.YS_CHARGE_WORKORDER_SET(V_I_IP, V_USERCODE, V_USERNAME, V_V_ORDERID);
        String ys_01 = (String) data.get("RET");

        result.put("RET", ys_01);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "GetIp", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> GetIp(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> result = new HashMap<String, Object>();
        String ip = request.getRemoteAddr();

        result.put("RET", ip);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "YS_CHARGE_WORKORDER_N_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_WORKORDER_N_SEL(String V_V_ORDERID, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                         HttpServletRequest request, HttpServletResponse response) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHARGE_WORKORDER_N_SEL(V_V_ORDERID);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "YS_CHARGE_WORKORDER_MAT_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_WORKORDER_MAT_SEL(String V_V_CHARGE_ID, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                           HttpServletRequest request, HttpServletResponse response) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHARGE_WORKORDER_MAT_SEL(V_V_CHARGE_ID);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "YS_CHARGE_WORKORDER_PER_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_WORKORDER_PER_SEL(String V_V_CHARGE_ID, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                           HttpServletRequest request, HttpServletResponse response) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHARGE_WORKORDER_PER_SEL(V_V_CHARGE_ID);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "YS_CHARGE_WORKORDER_TOOL_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_WORKORDER_TOOL_SEL(String V_V_CHARGE_ID, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                            HttpServletRequest request, HttpServletResponse response) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHARGE_WORKORDER_TOOL_SEL(V_V_CHARGE_ID);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "YS_CHARGE_WORKORDER_CON_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_WORKORDER_CON_SEL(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E, String V_V_ORGCODE, String V_V_DEPTCODE,
                                                           String V_EQUTYPE_CODE, String V_EQU_CODE, String V_DJ_PERCODE, String V_V_STATE_BILL, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                           HttpServletRequest request, HttpServletResponse response) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHARGE_WORKORDER_CON_SEL(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE, V_V_STATE_BILL);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "YS_CHARGE_WORKORDER_BILL_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_WORKORDER_BILL_SEL(String V_V_CHARGE_ID, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                            HttpServletRequest request, HttpServletResponse response) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHARGE_WORKORDER_BILL_SEL(V_V_CHARGE_ID);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "YS_CHARGE_WORKORDER_CON_SET", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_WORKORDER_CON_SET(@RequestParam(value = "V_V_CHARGE_ID_LIST", required = false) List<String> V_V_CHARGE_ID_LIST,
                                                           HttpServletRequest request, HttpServletResponse response, HttpSession session)
            throws com.fasterxml.jackson.core.JsonProcessingException, NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        for (int i = 0; i < V_V_CHARGE_ID_LIST.size(); i++) {

            HashMap data = ysService.YS_CHARGE_WORKORDER_CON_SET(V_V_CHARGE_ID_LIST.get(i));

            result.put("RET", data.get("RET"));

        }
        return result;

    }

    @RequestMapping(value = "YS_CHARGE_WORKORDER_PAY_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_WORKORDER_PAY_SEL(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E, String V_V_ORGCODE, String V_V_DEPTCODE,
                                                           String V_EQUTYPE_CODE, String V_EQU_CODE, String V_DJ_PERCODE, String V_V_STATE_BILL, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                           HttpServletRequest request, HttpServletResponse response) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHARGE_WORKORDER_PAY_SEL(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE, V_V_STATE_BILL);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "YS_CHARGE_WORKORDER_PAY_SET", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_WORKORDER_PAY_SET(@RequestParam(value = "V_V_CHARGE_ID_LIST", required = false) List<String> V_V_CHARGE_ID_LIST,
                                                           HttpServletRequest request, HttpServletResponse response, HttpSession session)
            throws com.fasterxml.jackson.core.JsonProcessingException, NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        for (int i = 0; i < V_V_CHARGE_ID_LIST.size(); i++) {

            HashMap data = ysService.YS_CHARGE_WORKORDER_PAY_SET(V_V_CHARGE_ID_LIST.get(i));

            result.put("RET", data.get("RET"));

        }
        return result;

    }

    @RequestMapping(value = "YS_CHARGE_WORKORDER_DAY_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_WORKORDER_DAY_SEL(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E, String V_V_ORGCODE, String V_V_DEPTCODE,
                                                           String V_EQUTYPE_CODE, String V_EQU_CODE, String V_DJ_PERCODE, String V_V_STATE_BILL, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                           HttpServletRequest request, HttpServletResponse response) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHARGE_WORKORDER_DAY_SEL(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE, V_V_STATE_BILL);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "YS_CHARGE_WORKORDER_ORG_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_WORKORDER_ORG_SEL(Integer V_I_YEAR, Integer V_I_MONTH, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                           HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHARGE_WORKORDER_ORG_SEL(V_I_YEAR, V_I_MONTH);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "YS_CHARGE_WORKORDER_DEPT_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_WORKORDER_DEPT_SEL(Integer V_I_YEAR, Integer V_I_MONTH, String V_V_ORGCODE, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                            HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHARGE_WORKORDER_DEPT_SEL(V_I_YEAR, V_I_MONTH, V_V_ORGCODE);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "YS_CHARGE_WORKORDER_DETAIL_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_WORKORDER_DETAIL_SEL(Integer V_I_YEAR, Integer V_I_MONTH, String V_V_ORGCODE, String V_V_DEPTCODE, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                              HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHARGE_WORKORDER_DETAIL_SEL(V_I_YEAR, V_I_MONTH, V_V_ORGCODE, V_V_DEPTCODE);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "YS_CHARGE_WORKORDER_ORG_D_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_WORKORDER_ORG_D_SEL(Integer V_I_YEAR, Integer V_I_MONTH, String V_V_ORGCODE, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                             HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHARGE_WORKORDER_ORG_D_SEL(V_I_YEAR, V_I_MONTH, V_V_ORGCODE);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "YS_CHARGE_PROJECT_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_PROJECT_SEL(String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE, String V_V_DEPTCODE, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                     HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHARGE_PROJECT_SEL(V_V_YEAR, V_V_MONTH, V_V_ORGCODE, V_V_DEPTCODE);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "YS_CHARGE_PROJECT_DETAIL_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_PROJECT_DETAIL_SEL(String V_V_GUID, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                            HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHARGE_PROJECT_DETAIL_SEL(V_V_GUID);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "YS_CHARGE_PROJECT_W_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHARGE_PROJECT_W_SEL(String V_V_GUID, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                       HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHARGE_PROJECT_W_SEL(V_V_GUID);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/YS_CHARGE_PROJECT_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_PROJECT_TOTAL_SEL(String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE, String V_V_DEPTCODE,
                                           HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_PROJECT_TOTAL_SEL(V_V_YEAR, V_V_MONTH, V_V_ORGCODE, V_V_DEPTCODE);
    }

    @RequestMapping(value = "/YS_CHARGE_PROJECT_D_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_PROJECT_D_TOTAL_SEL(String V_V_GUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_PROJECT_D_TOTAL_SEL(V_V_GUID);
    }

    @RequestMapping(value = "/YS_CHARGE_PROJECT_W_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_PROJECT_W_TOTAL_SEL(String V_V_GUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_PROJECT_W_TOTAL_SEL(V_V_GUID);
    }

    @RequestMapping(value = "/YS_CHARGE_W_BILL_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_W_BILL_TOTAL_SEL(String V_V_CHARGE_ID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_W_BILL_TOTAL_SEL(V_V_CHARGE_ID);
    }

    @RequestMapping(value = "/YS_CHARGE_W_MAT_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_W_MAT_TOTAL_SEL(String V_V_CHARGE_ID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_W_MAT_TOTAL_SEL(V_V_CHARGE_ID);
    }

    @RequestMapping(value = "/YS_CHARGE_W_PER_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_W_PER_TOTAL_SEL(String V_V_CHARGE_ID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_W_PER_TOTAL_SEL(V_V_CHARGE_ID);
    }

    @RequestMapping(value = "/YS_CHARGE_W_TOOL_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_W_TOOL_TOTAL_SEL(String V_V_CHARGE_ID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_W_TOOL_TOTAL_SEL(V_V_CHARGE_ID);
    }

    @RequestMapping(value = "/YS_CHARGE_W_CON_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_W_CON_TOTAL_SEL(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E, String V_V_ORGCODE, String V_V_DEPTCODE,
                                         String V_EQUTYPE_CODE, String V_EQU_CODE, String V_DJ_PERCODE, String V_V_STATE_BILL,
                                         HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_W_CON_TOTAL_SEL(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE, V_V_STATE_BILL);
    }

    @RequestMapping(value = "/YS_CHARGE_W_PAY_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_W_PAY_TOTAL_SEL(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E, String V_V_ORGCODE, String V_V_DEPTCODE,
                                         String V_EQUTYPE_CODE, String V_EQU_CODE, String V_DJ_PERCODE, String V_V_STATE_BILL,
                                         HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_W_PAY_TOTAL_SEL(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE, V_V_STATE_BILL);
    }

    @RequestMapping(value = "/YS_CHARGE_W_DAY_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_W_DAY_TOTAL_SEL(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E, String V_V_ORGCODE, String V_V_DEPTCODE,
                                         String V_EQUTYPE_CODE, String V_EQU_CODE, String V_DJ_PERCODE, String V_V_STATE_BILL,
                                         HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_W_DAY_TOTAL_SEL(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE, V_V_STATE_BILL);
    }

    @RequestMapping(value = "/YS_CHARGE_W_ORG_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_W_ORG_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_W_ORG_TOTAL_SEL(V_I_YEAR, V_I_MONTH);
    }

    @RequestMapping(value = "/YS_CHARGE_W_DEPT_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_W_DEPT_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH,String V_V_ORGCODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_W_DEPT_TOTAL_SEL(V_I_YEAR, V_I_MONTH, V_V_ORGCODE);
    }

    @RequestMapping(value = "/YS_CHARGE_W_DEPT_D_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_W_DEPT_D_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH,String V_V_ORGCODE,String V_V_DEPTCODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_W_DEPT_D_TOTAL_SEL(V_I_YEAR, V_I_MONTH, V_V_ORGCODE, V_V_DEPTCODE);
    }

    @RequestMapping(value = "/YS_CHARGE_WORKORDER_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_WORKORDER_TOTAL_SEL(String V_V_ORDERID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_WORKORDER_TOTAL_SEL(V_V_ORDERID);
    }

    @RequestMapping(value = "/YS_REPORT_CHARGE_ORG_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_REPORT_CHARGE_ORG_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_REPORT_CHARGE_ORG_TOTAL_SEL(V_I_YEAR, V_I_MONTH);
    }

    @RequestMapping(value = "/YS_REPORT_CHARGE_C_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_REPORT_CHARGE_C_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH,String V_CHARGECODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_REPORT_CHARGE_C_TOTAL_SEL(V_I_YEAR, V_I_MONTH, V_CHARGECODE);
    }

    @RequestMapping(value = "/YS_REPORT_C_DEPT_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_REPORT_C_DEPT_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH,String V_DEPTCODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_REPORT_C_DEPT_TOTAL_SEL(V_I_YEAR, V_I_MONTH, V_DEPTCODE);
    }

    @RequestMapping(value = "/YS_REPORT_C_OTHERD_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_REPORT_C_OTHERD_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_REPORT_C_OTHERD_TOTAL_SEL(V_I_YEAR, V_I_MONTH);
    }

    @RequestMapping(value = "/YS_REPORT_CHARGE_C_O_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_REPORT_CHARGE_C_O_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH,String V_CHARGECODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_REPORT_CHARGE_C_O_TOTAL_SEL(V_I_YEAR, V_I_MONTH, V_CHARGECODE);
    }

    @RequestMapping(value = "/YS_REPORT_C_OTHER_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_REPORT_C_OTHER_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH,String V_DEPTCODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_REPORT_C_OTHER_TOTAL_SEL(V_I_YEAR, V_I_MONTH, V_DEPTCODE);
    }

    @RequestMapping(value = "/ys_report_charge_otherDept_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map ys_report_charge_otherDept_sel(Integer V_I_YEAR, Integer V_I_MONTH, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.ys_report_charge_otherDept_sel(V_I_YEAR, V_I_MONTH);
    }

    @RequestMapping(value = "/ys_report_charge_c_otherD_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map ys_report_charge_c_otherD_sel(Integer V_I_YEAR, Integer V_I_MONTH,String V_CHARGECODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.ys_report_charge_c_otherD_sel(V_I_YEAR, V_I_MONTH, V_CHARGECODE);
    }

    @RequestMapping(value = "/ys_report_charge_otherD_sel", method = RequestMethod.POST)
    @ResponseBody
    public Map ys_report_charge_otherD_sel(Integer V_I_YEAR, Integer V_I_MONTH,String V_DEPTCODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.ys_report_charge_otherD_sel(V_I_YEAR, V_I_MONTH, V_DEPTCODE);
    }

    @RequestMapping(value = "/YS_CHARGE_PROJECT_ORG_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_PROJECT_ORG_SEL(String V_V_YEAR, String V_V_MONTH, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_PROJECT_ORG_SEL(V_V_YEAR, V_V_MONTH);
    }

    @RequestMapping(value = "/YS_CHARGE_PROJECT_DEPT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_PROJECT_DEPT_SEL(String V_V_YEAR, String V_V_MONTH,String V_V_ORGCODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_PROJECT_DEPT_SEL(V_V_YEAR, V_V_MONTH, V_V_ORGCODE);
    }

    @RequestMapping(value = "/YS_CHARGE_P_ORG_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_P_ORG_TOTAL_SEL(String V_V_YEAR, String V_V_MONTH, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_P_ORG_TOTAL_SEL(V_V_YEAR, V_V_MONTH);
    }

    @RequestMapping(value = "/YS_CHARGE_P_DEPT_TOTAL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHARGE_P_DEPT_TOTAL_SEL(String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHARGE_P_DEPT_TOTAL_SEL(V_V_YEAR, V_V_MONTH, V_V_ORGCODE);
    }

    @RequestMapping(value = "/YS_CHART_PROJECT_ORG_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHART_PROJECT_ORG_SEL(String V_YEAR_BEGIN, String V_YEAR_END, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHART_PROJECT_ORG_SEL(V_YEAR_BEGIN, V_YEAR_END);
    }

    @RequestMapping(value = "/YS_CHART_PROJECT_YEAR_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHART_PROJECT_YEAR_SEL(String V_V_YEAR, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHART_PROJECT_YEAR_SEL(V_V_YEAR);
    }

    @RequestMapping(value = "/YS_CHART_PROJECT_ORG_S_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHART_PROJECT_ORG_S_SEL(String V_V_YEAR, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHART_PROJECT_ORG_S_SEL(V_V_YEAR);
    }

    @RequestMapping(value = "/YS_CHART_PROJECT_DEPT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map YS_CHART_PROJECT_DEPT_SEL(String V_V_YEAR,String V_V_ORGCODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return ysService.YS_CHART_PROJECT_DEPT_SEL(V_V_YEAR, V_V_ORGCODE);
    }

    @RequestMapping(value = "YS_CHART_PROJECT_EQU_SEL", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> YS_CHART_PROJECT_EQU_SEL(String V_V_YEAR,String V_V_ORGCODE,String V_V_DEPTCDE,String V_EQUTYPE_CODE,String V_EQU_CODE, @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                       HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = ysService.YS_CHART_PROJECT_EQU_SEL(V_V_YEAR, V_V_ORGCODE, V_V_DEPTCDE, V_EQUTYPE_CODE, V_EQU_CODE);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

}
