package org.building.pm.webservice;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WxjhService {

    private static final Logger logger = Logger.getLogger(WxjhService.class.getName());
    @Autowired
    private ComboPooledDataSource dataSources;

}
