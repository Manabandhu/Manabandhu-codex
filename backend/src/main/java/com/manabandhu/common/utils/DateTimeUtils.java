package com.manabandhu.common.utils;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

public final class DateTimeUtils {
    private static final DateTimeFormatter ISO_FORMATTER = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    private DateTimeUtils() {}

    public static String format(OffsetDateTime time) {
        return time == null ? null : ISO_FORMATTER.format(time);
    }

    public static OffsetDateTime parse(String value) {
        return value == null ? null : OffsetDateTime.parse(value, ISO_FORMATTER);
    }
}
