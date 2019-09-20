var searchQuery = "";
var localhost = "http://localhost:52885/api/";
var $lstTemplates = $('#divTemplates').children();
$(document).ready(function () {
    bindEvents();
});
function bindEvents() {
    $("#searchclear").hide();
    $("#searchInput").keyup(function () {
        searchQuery = $("#searchInput").val();
        if (searchQuery.length > 0) {
            $("#searchclear").show();
        } else {
            $("#searchclear").hide();
        }
    });
    $("#searchBtn").on("click", function () {
        $("#tblSearch").remove();
        if (searchQuery.length == 0) {
            alert('Your search query is empty');
        } else {
            searchName(searchQuery);
        }
    });
    $("#searchclear").on("click", function () {
        searchQuery = "";
        $("#searchInput").val("");
        $("#searchclear").hide();
        $("#tblSearch").remove();
        getAllEditorDatas();
    });
    $(".fa-trash").on("click", function () {
        var id = $(this).data('id');
        if (id <= 0) { alert("Invalid data") }
        else {
            deleteEditorById(id);
        }
    });
}
function deleteEditorById(id) {
    $.ajax({
        url: localhost + "delete/" + id,
        type: 'post',
    }).done(function (response) {
        if (response) {
            ReloadToHomePage();
        }
    });
}
function ReloadToHomePage() {
    $.get("http://localhost:52885/");
}
function getAllEditorDatas() {
    $.ajax({
        url: localhost + "get-all",
        type: 'GET'
    }).done(function (response) {
        if (response == null) {
            alert("No datas");
        } else {
            var html = generateHtml(response);
        }
    });
}
function searchName(query) {
    $.ajax({
        url: localhost + "count?searchQuery=" + query,
        type: 'get'
    }).done(function (response) {
        if (response == 0) {
            alert("No Data found");
        }
        else {
            getDatasBySearchQuery(response);
        }
    });
}
function getDatasBySearchQuery(take) {
    $.ajax({
        url: localhost + "get?searchQuery=" + searchQuery,
        type: 'Post',
    }).done(function (response) {
        if (response == null) {
            noDataFound();
        } else {
            generateHtml(response);
        }
    });
}
function noDataFound() {
    alert("Data is not found");
}
function generateHtml(response) {
    bindTemplate('search-table', { response: response });
}

function bindTemplate(templateId, jsonData) {
    var textTemplate = getTemplate(templateId);
    var templateCompiled = _.template(textTemplate);
    var finalTemplate = templateCompiled(jsonData);
    $(".body").append(finalTemplate);
}

function getTemplate(templateId) {
    var txtTemplate = $('#divTemplates').children().map(function () {
        if (this.id == templateId) {
            return $(this).html();
        }
    }).get(0);
    return txtTemplate;
}