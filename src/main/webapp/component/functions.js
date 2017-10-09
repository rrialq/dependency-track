/*
 * This file is part of Dependency-Track.
 *
 * Dependency-Track is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * Dependency-Track is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Dependency-Track. If not, see http://www.gnu.org/licenses/.
 */

"use strict";

function populateComponentData(data) {
    $("#componentName").html(data.name);
    if (data.version) {
        $("#componentVersion").html(" &#x025B8; " + data.version);
    }
    if (data.resolvedLicense && data.resolvedLicense.name) {
        $("#componentLicense").html(data.resolvedLicense.name);
    } else if (data.license) {
        $("#componentLicense").html(data.license);
    }
}

function formatVulnerabilitiesTable(res) {
    for (let i=0; i<res.length; i++) {
        let vulnurl = "../vulnerability/?source=" + res[i].source + "&vulnId=" + res[i].vulnId;
        res[i].vulnerabilityhref = formatSourceLabel(res[i].source) + " <a href=\"" + vulnurl + "\">" + res[i].vulnId + "</a>";

        if (res[i].hasOwnProperty("cwe")) {
            res[i].cwefield = "CWE-" + res[i].cwe.cweId + " " + res[i].cwe.name;
        }

        if (res[i].hasOwnProperty("severity")) {
            res[i].severityLabel = formatSeverityLabel(res[i].severity);
        }

        if (res[i].hasOwnProperty("published")) {
            res[i].publishedLabel = formatTimestamp(res[i].published);
        }
    }
    return res;
}

function formatProjectsTable(res) {
    for (let i=0; i<res.length; i++) {
        let projecturl = "../project/?uuid=" + res[i].project.uuid;
        res[i].project.projecthref = "<a href=\"" + projecturl + "\">" + res[i].project.name + "</a>";
    }
    return res;
}

function populateMetrics(data) {
    $("#metricCritical").html(data.critical);
    $("#metricHigh").html(data.high);
    $("#metricMedium").html(data.medium);
    $("#metricLow").html(data.low);
    $("#metricIrs").html(data.inheritedRiskScore);
}

/**
 * Setup events and trigger other stuff when the page is loaded and ready
 */
$(document).ready(function () {
    let uuid = $.getUrlVar('uuid');

    $rest.getComponent(uuid, populateComponentData);
    $rest.getComponentCurrentMetrics(uuid, populateMetrics);
});