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
        //获取点检任务
        HashMap data = hpService.PM_06_DJ_CRITERION_DSDATA_SEL();

        List<Map<String, Object>> dataList = (List<Map<String, Object>>) data.get("list");
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat nformat = new SimpleDateFormat("yyyy-MM-dd");


        long nw = 1000 * 24 * 60 * 60 * 7;//天
        long nd = 1000 * 24 * 60 * 60;//天
        long nh = 1000 * 60 * 60;//小时
        long nm = 1000 * 60;//分钟


        for (int i = 0; i < dataList.size(); i++) {

            String timetype = dataList.get(i).get("V_CRITERION_CYCLETYPE").toString();//点检周期类型（小时，天，周，月，年）
            double d = (double) dataList.get(i).get("V_CRITERION_CYCLE");
            int zq = (int) d;//点检周期

            Date ndate=new Date();

            Date nowdate = null;
            Date plandate = null;
            try {

                Map result = hpService.PM_06_DJ_DATA_TIMER_MAXTIME(dataList.get(i).get("V_CRITERION_CODE").toString());
                nowdate = format.parse(format.format(ndate));//当前日期 小时分钟秒格式转化为date格式
                plandate=format.parse(result.get("RET").toString());
               // plandate = format.parse(nformat.format(ndate) + " 00:00:01");//当前日期 0点0分1秒
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            long diff = 0;
            long hour = 0;
            int hourc = 0;

            long day = 0;
            int dayc = 0;

            long week = 0;
            int weekc = 0;

            int month = 0;
            int monthc = 0;
            if (timetype.equals("小时")) {
                diff = nowdate.getTime() - plandate.getTime();// 获得两个时间的毫秒时间差异
                hour = diff / nh;//相差小时数
                if(zq!=0){
                    hourc = (int) (hour / zq);//相差周期数

                    for (int j = 1; j <= hourc; j++) {

                        long timeer = plandate.getTime() + j * zq * nh;

                        String v_v_timer_guid= String.valueOf(UUID.randomUUID());

                        hpService.PM_06_DJ_DATA_TIMER_SET((String) dataList.get(i).get("V_CRITERION_CODE"), v_v_timer_guid, (String) dataList.get(i).get("V_FZ_PER"), (String) dataList.get(i).get("V_DJ_TYPE"), format.format(timeer));
                    }
                }

            } else if (timetype.equals("天")) {
                diff = nowdate.getTime() - plandate.getTime();// 获得两个时间的毫秒时间差异
                day = diff / nd;//相差天数
                dayc = (int) (day / zq);//相差周期数

                for (int j = 1; j <= dayc; j++) {
                    long timeer = plandate.getTime() + j * zq * nd;

                    String v_v_timer_guid= String.valueOf(UUID.randomUUID());


                    hpService.PM_06_DJ_DATA_TIMER_SET((String) dataList.get(i).get("V_GUID"), v_v_timer_guid, (String) dataList.get(i).get("V_FZ_PER"), (String) dataList.get(i).get("V_DJ_TYPE"), format.format(timeer));
                }

            } else if (timetype.equals("周")) {

                diff = nowdate.getTime() - plandate.getTime();// 获得两个时间的毫秒时间差异
                week = diff / nw;//相差周数
                weekc = (int) (week / zq);//相差周期数

                for (int j = 1; j <= weekc; j++) {
                    long timeer = plandate.getTime() + j * zq * nw;

                    String v_v_timer_guid= String.valueOf(UUID.randomUUID());

                    hpService.PM_06_DJ_DATA_TIMER_SET((String) dataList.get(i).get("V_GUID"), v_v_timer_guid, (String) dataList.get(i).get("V_FZ_PER"), (String) dataList.get(i).get("V_DJ_TYPE"), format.format(timeer));
                }

            } else if (timetype.equals("月")) {
                Calendar cnowdate = Calendar.getInstance();
                Calendar cplandate = Calendar.getInstance();
                cnowdate.setTime(nowdate);
                cplandate.setTime(plandate);
                if (cnowdate.getTimeInMillis() < cplandate.getTimeInMillis()) {
                    //现日期早于计划日期，无法添加
                }
                int yearn = cnowdate.get(Calendar.YEAR);
                int yearp = cplandate.get(Calendar.YEAR);
                int monthn = cnowdate.get(Calendar.MONTH);
                int monthp = cplandate.get(Calendar.MONTH);
                int dayn = cnowdate.get(Calendar.DAY_OF_MONTH);
                int dayp = cplandate.get(Calendar.DAY_OF_MONTH);

                // 获取年的差值
                int yearInterval = yearn - yearp;

                // 如果 nowdate 月-日 小于 plandate 月-日 那么 yearInterval-- 这样就得到了相差的年数
                if (monthn < monthp || monthn == monthp && dayn < dayp) {
                    yearInterval--;
                }
                // 获取月数差值
                int monthInterval = (monthn + 12) - monthp;

                if (dayn < dayp) {
                    monthInterval--;
                }
                monthInterval %= 12;

                month = yearInterval * 12 + monthInterval;//相差月数
                monthc = month / zq;//相差周期数

                for (int j = 1; j <= monthc; j++) {

                    int yearzq = yearp;
                    int monthzq = monthp + zq * j;
                    if (monthzq > 12) {
                        yearzq++;
                        monthzq %= 12;
                    }

                    Date date = new Date(yearzq + "-" + monthzq + "-" + dayp);
                    long timeer = date.getTime();

                    String v_v_timer_guid= String.valueOf(UUID.randomUUID());

                    hpService.PM_06_DJ_DATA_TIMER_SET((String) dataList.get(i).get("V_GUID"), v_v_timer_guid, (String) dataList.get(i).get("V_FZ_PER"), (String) dataList.get(i).get("V_DJ_TYPE"), format.format(timeer));
                }

            } else if (timetype.equals("年")) {

                Calendar cnowdate = Calendar.getInstance();
                Calendar cplandate = Calendar.getInstance();
                cnowdate.setTime(nowdate);
                cplandate.setTime(plandate);
                int yearn = cnowdate.get(Calendar.YEAR);
                int yearp = cplandate.get(Calendar.YEAR);
                int monthn = cnowdate.get(Calendar.MONTH);
                int monthp = cplandate.get(Calendar.MONTH);
                int dayn = cnowdate.get(Calendar.DAY_OF_MONTH);
                int dayp = cplandate.get(Calendar.DAY_OF_MONTH);


                int year = yearn - yearp;
                int yearc = year / zq;

                for (int j = 1; j <= monthc; j++) {

                    int yearzq = yearp + j * zq;
                    Date date = new Date(yearzq + "-" + monthp + "-" + dayp);
                    long timeer = date.getTime();

                    String v_v_timer_guid= String.valueOf(UUID.randomUUID());

                    hpService.PM_06_DJ_DATA_TIMER_SET((String) dataList.get(i).get("V_GUID"), v_v_timer_guid, (String) dataList.get(i).get("V_FZ_PER"), (String) dataList.get(i).get("V_DJ_TYPE"), format.format(timeer));

                }

            }
        }
    }

}
