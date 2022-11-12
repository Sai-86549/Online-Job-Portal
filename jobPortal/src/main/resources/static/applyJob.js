var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
    const userId = localStorage.getItem("userId");
    $scope.provider = localStorage.getItem("provider");
    var URL = "https://fir-1c7de-default-rtdb.firebaseio.com";
    $scope.orderDetails = {};
    $(".jobTypeCls").show();
    $("#biilingId").hide();
    $scope.viewOrderTableData = [];
    $scope.jobList = [{
        "jobType": "IT Services & Consulting",
        "availableJob": [{
            "companyName": "TCS",
            "post": "Dveloper",
            "workExperienceExpected": "1-3 years"
        },
        {
            "companyName": "IBM",
            "post": "Senior Dveloper",
            "workExperienceExpected": "5-10 years"
        },
        {
            "companyName": "Meta",
            "post": "Tecnical Lead",
            "workExperienceExpected": "10-20 years"
        },
        {
            "companyName": "Apple",
            "post": "Dveloper",
            "workExperienceExpected": "3-10 years"
        },
        {
            "companyName": "Samsung",
            "post": "Dveloper",
            "workExperienceExpected": "1-5 years"
        },]
    },
    {
        "jobType": "Banking",
        "availableJob": [{
            "companyName": "Bank of America",
            "post": "Accountant",
            "workExperienceExpected": "5-10 years"
        },
        {
            "companyName": "CITI bank",
            "post": "Manager",
            "workExperienceExpected": "5-10 years"
        },
        {
            "companyName": "Wells Fargo Bank",
            "post": "Accountant",
            "workExperienceExpected": "5-7 years"
        },
        {
            "companyName": "Citibank and U.S. Bank",
            "post": "Accountant",
            "workExperienceExpected": "3-10 years"
        },
        {
            "companyName": "JPMorgan Chase",
            "post": "Manager",
            "workExperienceExpected": "10-25 years"
        }]
    },
    {
        "jobType": "Eduction",
        "availableJob": [{
            "companyName": "University of California",
            "post": "Science Professor",
            "workExperienceExpected": "5-10 years"
        }, {
            "companyName": "Berkeley",
            "post": "Laboratory assistant",
            "workExperienceExpected": "5-10 years"
        }, {
            "companyName": "Harvard University",
            "post": "Department Head",
            "workExperienceExpected": "5-7 years"
        }, {
            "companyName": "University of Cambridge",
            "post": "Professor",
            "workExperienceExpected": "3-10 years"
        }, {
            "companyName": "University of Oxford",
            "post": "Professor",
            "workExperienceExpected": "10-25 years"
        }, {
            "companyName": "Michigan State University",
            "post": "Professor",
            "workExperienceExpected": "3-10 years"
        }, {
            "companyName": "University of Pennsylvania",
            "post": "Laboratory assistant",
            "workExperienceExpected": "10-25 years"
        }]
    }, {
        "jobType": "Automobile",
        "availableJob": [{
            "companyName": "BMW",
            "post": "Sales Consultant",
            "workExperienceExpected": "5-10 years"
        },
        {
            "companyName": "Buick",
            "post": "Sales Consultant",
            "workExperienceExpected": "5-10 years"
        },
        {
            "companyName": "Acura",
            "post": "Sales Consultant",
            "workExperienceExpected": "5-7 years"
        },
        {
            "companyName": "Ford",
            "post": "Sales Consultant",
            "workExperienceExpected": "3-10 years"
        },
        {
            "companyName": "Chevrolet",
            "post": "Sales Consultant",
            "workExperienceExpected": "10-25 years"
        }, {
            "companyName": "Honda",
            "post": "Sales Consultant",
            "workExperienceExpected": "3-10 years"
        }]
    },
    ]
    $scope.jobDetails = function (data) {
        $scope.jobDetails = data;
    }
    $scope.applyLoan = function () {
        if (checkIsNull($("#userNameId").val()) || checkIsNull($("#ageId").val())
            || checkIsNull($("#workingExperienceId").val()) || checkIsNull($("#userEmailId").val())
            || checkIsNull($("#contactId").val()) || checkIsNull($("#salaryExpectId").val())) {
            alert("Please fill all the required data");
        } else {
            let reqstBody = {
                "userNameId": $("#userNameId").val(),
                "ageId": $("#ageId").val(),
                "workingExperienceId": $("#workingExperienceId").val(),
                "userEmailId": $("#userEmailId").val(),
                "contactId": $("#contactId").val(),
                "salaryExpectId": $("#salaryExpectId").val(),
                "applyDate": new Date().toISOString().split('T')[0],
                "status": "pending",
                "companyName": $scope.jobDetails.companyName,
            };
            $.ajax({
                type: 'post',
                contentType: "application/json",
                dataType: 'json',
                cache: false,
                url: URL + "/applyJob/" + userId + ".json",
                data: JSON.stringify(reqstBody),
                success: function (response) {
                    $('#placeOrderModalId').modal('hide');
                    $scope.switchMenu("BILLING", "billingTabId");
                    alert("Request applied sucessfully!!!");
                }, error: function (error) {
                    alert("Something went wrong");
                }
            });
        }
    }
    $scope.getOrderTableData = function (type) {
        $scope.viewOrderTableData = [];
        let orderList = [];
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/applyJob/" + userId + ".json",
            success: function (response) {
                for (let i in response) {
                    let eventData = response[i];
                    eventData["orderId"] = i;
                    orderList.push(eventData);
                }
                $scope.viewOrderTableData = orderList;
                $scope.$apply();
            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
    $scope.getLoanAdminTableData = function (type) {
        $scope.viewOrderTableData = [];
        let orderList = [];
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/applyJob.json",
            success: function (response) {
                for (let data in response) {
                    //let eventData = response[data];

                    //orderList.push(eventData);
                    for (let x in response[data]) {
                        let eventData = response[data][x];
                        eventData["orderId"] = data;
                        eventData["childOrderId"] = x;
                        orderList.push(eventData);
                    }
                }
                $scope.viewOrderTableData = orderList;
                $scope.$apply();
            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
    $scope.getOrderData = function (data) {
        $("#ammountId").val(data.price);
        $scope.orderDetails = data;

    }
    $scope.logout = function () {
        localStorage.removeItem("userId");
        localStorage.removeItem("userData");
        window.location.href = "loginRegJobApply.html";
    }
    $scope.switchMenu = function (type, id) {
        $(".menuCls").removeClass("active");
        $('#' + id).addClass("active");
        $(".jobTypeCls").hide();
        $("#biilingId").hide();
        if (type == "MENU") {
            $(".jobTypeCls").show();
        } else if (type == "BILLING") {
            $("#biilingId").show();
            $scope.provider == 'true' ? $scope.getLoanAdminTableData() : $scope.getOrderTableData("BILLING");

        }
    }
    $scope.loanApprovalStatus = function (data, model) {
        let requestBody = {
            "status": model
        }
        $.ajax({
            type: 'patch',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/applyJob/" + data.orderId + "/" + data.childOrderId + ".json",
            data: JSON.stringify(requestBody),
            success: function (response) {
                $('#processToPayModalId').modal('hide');
                $scope.getLoanAdminTableData();
                alert("Data updated sucessfully!!!");
            }, error: function (error) {
                alert("Something went wrong");
            }
        });

    }
    function checkIsNull(value) {
        return value === "" || value === undefined || value === null ? true : false;
    }
});
