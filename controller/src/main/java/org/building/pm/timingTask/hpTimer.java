package org.building.pm.timingTask;

import org.building.pm.service.hpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashMap;

import java.sql.SQLException;
import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by hpnn on 2017/12/5.
 */
@Component
public class hpTimer {
    @Value("#{configProperties['PM_JST']}")
    private String pm_jst;

    @Autowired
    private hpService hpService;

    @Scheduled(cron = "0 0/1 * * * ?")//这是定时时间的地方
    public void setDJDB() throws SQLException {
        HashMap data = hpService.PM_06_DJ_CRITERION_DSDATA_SEL();

        List<Map<String, Object>> dataList = (List<Map<String, Object>>) data.get("list");
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        long nd = 1000 * 24 * 60 * 60;//天
        long nh = 1000 * 60 * 60;//小时
        long nm = 1000 * 60;//分钟

        String v_v_timer_guid = String.valueOf(UUID.randomUUID());

        for (int i = 0; i < dataList.size(); i++) {

            String timetype = dataList.get(i).get("V_CRITERION_CYCLETYPE").toString();//点检周期类型（小时，天，周，月，年）
            double d= (double) dataList.get(i).get("V_CRITERION_CYCLE");
            int zq = (int)d;//点检周期

            Date now = new Date();

            Map result=hpService.PM_06_DJ_DATA_TIMER_MAXTIME(dataList.get(i).get("V_GUID").toString());

            String plantime = dataList.get(i).get("V_PLAN_TIME").toString().split(" ")[0] + " 00:00:01";//计划生成时间

            Date nowdate = null;
            Date plandate = null;
            try {
                nowdate = format.parse(result.get("RET").toString());//当前日期 小时分钟秒格式转化为date格式
                plandate = format.parse(plantime);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            long diff=0;
            long hour=0;
            int hourc=0;

            if (timetype.equals("小时")) {
                diff = nowdate.getTime() - plandate.getTime();// 获得两个时间的毫秒时间差异
                hour = diff  / nh;//相差小时数
                hourc = (int) (hour / zq);//相差周期数

                for (int j = 1; j <= hourc; j++) {
                    long timeer=plandate.getTime()+j*zq*nh;

                    hpService.PM_06_DJ_DATA_TIMER_SET((String) dataList.get(i).get("V_GUID"), v_v_timer_guid, (String) dataList.get(i).get("V_FZ_PER"), (String) dataList.get(i).get("V_DJ_TYPE"), format.format(timeer));
                }
            } else if (timetype.equals("天")) {

            } else if (timetype.equals("周")) {

            } else if (timetype.equals("月")) {

            } else if (timetype.equals("年")) {

            }
        }
    }
/*

                String intNumberzhouqi = String.valueOf(zhouqi);
                String intNumber = intNumberzhouqi.substring(0, intNumberzhouqi.indexOf("."));
                int index = intNumberzhouqi.lastIndexOf(".");
                char[] ch = intNumberzhouqi.toCharArray();
                String lastString = String.copyValueOf(ch, index + 1, ch.length - index - 1);
                String lastString2 = "0." + lastString;
                Double d = Double.valueOf(lastString2);
                Calendar ca = Calendar.getInstance();
                ca.setTime(sdftime.parse(scTime));
                ca.add(Calendar.HOUR_OF_DAY, Integer.parseInt(intNumber));
                ca.add(Calendar.MINUTE, (int) (d * 60));
                System.out.println("第" + i + "个最终时间时间为" + sdftime.format(ca.getTime()));
                System.out.println("第" + i + "个当前时间时间为" + sdftime.format(new Date()));
                String date1 = sdftime.format(ca.getTime());
                String date2 = sdftime.format(new Date());
                if (date1.equals(date2)) {
                    // HashMap dataSet = hpService.PM_06_DJ_CRITERION_JST_SET(pm_jst, "发送人即时通密码", "发送人即时通账号", (String) dataList.get(i).get("V_PLAN_PER"), "日常点检", (String) dataList.get(i).get("V_CRITERION_CONTENT"), 0, date2);
                    HashMap dataSet = hpService.PM_06_DJ_DATA_TIMER_SET((String) dataList.get(i).get("V_GUID"), v_v_timer_guid, (String) dataList.get(i).get("V_FZ_PER"), (String) dataList.get(i).get("V_DJ_TYPE"));
                }

            }

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }*/


    /*//查询AM_SEND有没有新数据有的话调用即时通
    @Scheduled(cron = "0 0/5 * * * ?")//这是定时时间的地方
    public void sendJstWithNew(){
        try {
            HashMap data = hpService.PM_AM_SEND_SEL();

            List<Map<String, Object>> dataList = (List<Map<String, Object>>) data.get("list");

            if (dataList != null) {
                for (int i = 0; i < dataList.size(); i++) {
                    Double I_I_FINISH = (Double) dataList.get(i).get("I_FINISH");
                    String state = String.valueOf(I_I_FINISH);
                    if (state.equals("0.0")) {
                        String V_V_SEND_PERSON = (String) dataList.get(i).get("V_SEND_PERSON");
                        String ret = hpService.AMToMessIFCheck("<SendMessage><AM_Name>" + V_V_SEND_PERSON + "</AM_Name><UserId></UserId><Type>即时通</Type><Access></Access><EMail></EMail><IsBack></IsBack><IsEncrypt></IsEncrypt><ISPriority></ISPriority><Ohter1></Ohter1><Ohter2></Ohter2><PhoneNum></PhoneNum><MessageTxt></MessageTxt><SystemName>AKSB</SystemName></SendMessage>", "http://localhost:8081/pm/app/pm/page/login/login.html");
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }*/
}
