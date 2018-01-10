package org.building.pm.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Charsets;
import com.google.common.base.Splitter;
import com.google.common.collect.Iterables;
import com.google.common.io.ByteStreams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

/**
 * Created by tangh on 2017/11/14.
 */

public class Servlets {
    private static Logger LOG = LoggerFactory.getLogger(Servlets.class);
    public static final long ONE_YEAR_SECONDS = 31536000L;
    public static final String MS_SEPARATOR = "\\";
    public static ObjectMapper MAPPER = new ObjectMapper();

    public Servlets() {
    }

    public static void setExpiresHeader(HttpServletResponse response, long expiresSeconds) {
        response.setDateHeader("Expires", System.currentTimeMillis() + expiresSeconds * 1000L);
        response.setHeader("Cache-Control", "private, max-age=" + expiresSeconds);
    }

    public static void setNoCacheHeader(HttpServletResponse response) {
        response.setDateHeader("Expires", 1L);
        response.addHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache, no-store, max-age=0");
    }

    public static void setLastModifiedHeader(HttpServletResponse response, long lastModifiedDate) {
        response.setDateHeader("Last-Modified", lastModifiedDate);
    }

    public static void setEtag(HttpServletResponse response, String etag) {
        response.setHeader("ETag", etag);
    }

    public static boolean checkIfModifiedSince(HttpServletRequest request, HttpServletResponse response, long lastModified) {
        long ifModifiedSince = request.getDateHeader("If-Modified-Since");
        if (ifModifiedSince != -1L && lastModified < ifModifiedSince + 1000L) {
            response.setStatus(304);
            return false;
        } else {
            return true;
        }
    }

    public static boolean checkIfNoneMatchEtag(HttpServletRequest request, HttpServletResponse response, String etag) {
        String headerValue = request.getHeader("If-None-Match");
        if (headerValue != null) {
            boolean conditionSatisfied = false;
            if (!"*".equals(headerValue)) {
                StringTokenizer commaTokenizer = new StringTokenizer(headerValue, ",");

                while (!conditionSatisfied && commaTokenizer.hasMoreTokens()) {
                    String currentToken = commaTokenizer.nextToken();
                    if (currentToken.trim().equals(etag)) {
                        conditionSatisfied = true;
                    }
                }
            } else {
                conditionSatisfied = true;
            }

            if (conditionSatisfied) {
                response.setStatus(304);
                response.setHeader("ETag", etag);
                return false;
            }
        }

        return true;
    }

    public static void setFileDownloadHeader(HttpServletRequest request, HttpServletResponse response, String fileName) {
        fileName = extractFileName(fileName);
        fileName = fileName.trim().replaceAll(" ", "_");
        String agent = request.getHeader("User-Agent");
        boolean isMSIE = agent != null && (agent.contains("MSIE") || agent.contains("Trident"));
        String encodedfileName;
        if (isMSIE) {
            encodedfileName = Encodes.urlEncode(fileName);
        } else {
            encodedfileName = new String(fileName.getBytes(), Charsets.ISO_8859_1);
        }

        response.setHeader("Content-Disposition", "attachment; filename=\"" + encodedfileName + "\"");
    }

    public static String extractFileName(String fileName) {
        if (fileName.contains("\\")) {
            Iterable split = Splitter.on("\\").split(fileName);
            fileName = (String) Iterables.getLast(split);
        }

        return fileName;
    }

    public static void downloadFile(HttpServletRequest request, HttpServletResponse response, String fileName, File file) throws IOException {
        setFileDownloadHeader(request, response, fileName);
        response.setContentType("application/octet-stream; charset=utf-8");
        response.setContentLength((int) file.length());
        FileInputStream inputStream = new FileInputStream(file);
        Throwable var5 = null;

        try {
            ServletOutputStream x2 = response.getOutputStream();
            Throwable var7 = null;

            try {
                ByteStreams.copy(inputStream, x2);
            } catch (Throwable var30) {
                var7 = var30;
                throw var30;
            } finally {
                if (x2 != null) {
                    if (var7 != null) {
                        try {
                            x2.close();
                        } catch (Throwable var29) {
                            var7.addSuppressed(var29);
                        }
                    } else {
                        x2.close();
                    }
                }

            }
        } catch (Throwable var32) {
            var5 = var32;
            throw var32;
        } finally {
            if (inputStream != null) {
                if (var5 != null) {
                    try {
                        inputStream.close();
                    } catch (Throwable var28) {
                        var5.addSuppressed(var28);
                    }
                } else {
                    inputStream.close();
                }
            }

        }

    }

    public static void downloadFile(HttpServletRequest request, HttpServletResponse response, String fileName, Resource resource) throws IOException {
        setFileDownloadHeader(request, response, fileName);
        response.setContentType("application/octet-stream; charset=utf-8");
        InputStream inputStream = resource.getInputStream();
        Throwable var5 = null;

        try {
            ServletOutputStream x2 = response.getOutputStream();
            Throwable var7 = null;

            try {
                ByteStreams.copy(inputStream, x2);
            } catch (Throwable var30) {
                var7 = var30;
                throw var30;
            } finally {
                if (x2 != null) {
                    if (var7 != null) {
                        try {
                            x2.close();
                        } catch (Throwable var29) {
                            var7.addSuppressed(var29);
                        }
                    } else {
                        x2.close();
                    }
                }

            }
        } catch (Throwable var32) {
            var5 = var32;
            throw var32;
        } finally {
            if (inputStream != null) {
                if (var5 != null) {
                    try {
                        inputStream.close();
                    } catch (Throwable var28) {
                        var5.addSuppressed(var28);
                    }
                } else {
                    inputStream.close();
                }
            }

        }

    }

    public static void writeJsonData(HttpServletRequest request, HttpServletResponse response, Object data) throws Exception {
//        if (request.getHeader("User-Agent").contains("MSIE")) {
            response.setContentType("text/html");
//        } else {
//            response.setContentType("application/json");
//        }

        PrintWriter writer = response.getWriter();
        Throwable var4 = null;

        try {
            writer.write(MAPPER.writeValueAsString(data));
        } catch (Throwable var13) {
            var4 = var13;
            throw var13;
        } finally {
            if (writer != null) {
                if (var4 != null) {
                    try {
                        writer.close();
                    } catch (Throwable var12) {
                        var4.addSuppressed(var12);
                    }
                } else {
                    writer.close();
                }
            }

        }

    }

    public static Map<String, Object> success() {
        HashMap result = new HashMap(1);
        result.put("message", "OK");
        return result;
    }

}

