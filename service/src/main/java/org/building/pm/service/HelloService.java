package org.building.pm.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * 示例的服务Bean
 */

@Service
public class HelloService {

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    /**
     * 取得版权信息
     * @return 版权信息
     */
    public String getCopyright() {
        return copyright;
    }
}
