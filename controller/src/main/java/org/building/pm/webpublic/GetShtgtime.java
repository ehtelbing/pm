package org.building.pm.webpublic;


import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;


@Service
public class GetShtgtime {

    public String Shtgtime() {
        Date date = new Date();
        Calendar c = Calendar.getInstance();
//        c.setTime(date);

        c.add(Calendar.MONTH, 3);
//        c.set(Calendar.DAY_OF_MONTH,c.getActualMaximum(c.DAY_OF_MONTH));
        c.set(Calendar.DAY_OF_MONTH,0);

        int  strDateTo = c.get(c.DATE);
        int month=c.get(Calendar.MONTH)+1;

        String time = c.get(Calendar.YEAR) + "-" + month  + "-" +strDateTo + "T23:59:59";

        return time;
    }

}
