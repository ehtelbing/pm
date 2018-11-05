package org.building.pm.controller;

import org.building.pm.service.DLService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by cxy on 2018/10/18.
 * DLController
 */
@Controller
@RequestMapping("/app/pm/DL")
public class DLController {

    @Autowired
    private DLService dlService;
    @Resource
    private ExcelData excelData;

    //
    @RequestMapping(value = "/importWXJL", method = RequestMethod.POST)
    @ResponseBody
    public Map importWXJL(@RequestParam("file") MultipartFile file,
                            HttpServletRequest request ,HttpServletResponse response) {
        Map p = new HashMap();
        try {
            ReadExcel readExcel=new ReadExcel();
//            List<Map> list = readExcel.getExcelInfo(file);
            List<Map> list =  excelData.GetData(file,1);
//            List<Object> ret=new ArrayList<Object>();
            String ret="";
            for(Map m:list) {
                ret=dlService.PM_ITWORKORDER_INT(m.get("k0").toString(), m.get("k1").toString(), m.get("k2").toString(),
                        m.get("k3").toString(),m.get("k4").toString(), m.get("k5").toString(), m.get("k6").toString(),
                        m.get("k7").toString(), m.get("k8").toString(), m.get("k9").toString());
                if(!ret.equals("SUCCESS")){
                    p.put("message","导入失败"+ret);
                    return p;
                }
            }
            p.put("message","导入成功");

        } catch (Exception e) {
            p.put("message","导入失败"+e.toString()+"-请查看当前模板是否是标准模板");
            //e.printStackTrace();
        }
        return p;
    }

}
