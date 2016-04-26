/* LanguageTool for Chrome 
 * Copyright (C) 2015 Daniel Naber (http://www.danielnaber.de)
 * 
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301
 * USA
 */
"use strict";

let defaultServerUrl = 'https://languagetool.org:8081/';   // keep in sync with defaultServerUrl in popup.js

function saveOptions() {
    let url = document.getElementById('apiServerUrl').value;
    let status = document.getElementById('status');
    if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
        status.textContent = 'This URL is not valid.';
    } else {
        status.textContent = '';
        var storage = chrome.storage.sync ? chrome.storage.sync : chrome.storage.local;
        storage.set({
            apiServerUrl: url
        }, function() {
            close();
        });
    }
}

function restoreOptions() {
    document.getElementById('serverText').textContent = chrome.i18n.getMessage("serverText");
    document.getElementById('defaultServerLink').textContent = chrome.i18n.getMessage("defaultServerLink");
    document.getElementById('save').textContent = chrome.i18n.getMessage("save");
    var storage = chrome.storage.sync ? chrome.storage.sync : chrome.storage.local;
    storage.get({
        apiServerUrl: defaultServerUrl
    }, function(items) {
        document.getElementById('apiServerUrl').value = items.apiServerUrl;
    });
}

function useDefaultServer() {
    document.getElementById('apiServerUrl').value = defaultServerUrl;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('defaultServerLink').addEventListener('click', useDefaultServer);
