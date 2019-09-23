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
    $(".glyphicon-edit").on("click", function () {
        var id = $(this).data('id');
        var data = getEditorDataById(id);
    });
    $("#editCancel").on("click", function () {
        $(".popup-edit div").css("display", "none");
        ClearInputFields();
    });
}
function ClearInputFields() {
    $('input[type=text]').remove();
}
function getEditorDataById(id) {
    $.ajax({
        url: localhost + "get/" + id,
        type: 'get'
    }).done(function (response) {
        if (response == null) {
            alert("Null data");
        } else {
            OpenPopup(response);
        }
    });
}
function OpenPopup(editorData) {
    generateEditPopup(editorData);
}
function generateEditPopup(editorData) {
    $(".popup-edit div").addClass("in");
    $(".popup-edit div").css("display", "block");
    var heading = "Editor Change";
    var bodyName = document.createElement('input');
    var bodyRole = document.createElement('input');
    bodyName.type = "text";
    bodyRole.type = "text";    
    bodyName.setAttribute("value", editorData.name);
    bodyRole.setAttribute("value", editorData.role);
    $(".modal-header.in").html(heading);
    $(".modal-body.in .name").append(bodyName);
    $(".modal-body.in .role").append(bodyRole);
    $('input[type=text]').addClass('form-control');
    $("a").setAttribute("data-id", editorData.id);
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
    $("#tblSearch").remove();
    getAllEditorDatas();
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