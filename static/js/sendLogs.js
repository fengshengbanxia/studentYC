function handle(){

	$("button[event=pass]").on("click", (e)=>{

        $.ajax({
            url: "/jobs/sendLogs/upd/",
            type: "POST",
            async: false,
            data:{
                id: $(e.target).attr("data"),
                status: 1
            },
            success: function(res){
                if(res.code == 0){

                    $.alert(res.msg, () =>{

                        window.location.reload();
                    });
                }else{
                    $.msg("error", res.msg);
                }
            }
        });
    });

    $("button[event=cancel]").on("click", (e)=>{

        $.ajax({
            url: "/jobs/sendLogs/upd/",
            type: "POST",
            async: false,
            data:{
                id: $(e.target).attr("data"),
                status: 2
            },
            success: function(res){
                if(res.code == 0){

                    $.alert(res.msg, () =>{

                        window.location.reload();
                    });
                }else{
                    $.msg("error", res.msg);
                }
            }
        });
    });
}

let colsShow = [];

if($('#sessionUserType').val() == 2){

      colsShow =  [
            {
                type: "number",
                title: "序号",
            },
			{
				field: "companyName",
				title: "企业名称",
				align: "center",
			},
			{
				field: "jobName",
				title: "岗位名称",
				align: "center",
			},
			{
				field: "jobDuty",
				title: "岗位职责",
				align: "center",
			},
			{
				field: "snedTime",
				title: "投递时间",
				align: "center",
			},
			{
                title: "处理结果",
                template: (d)=>{

                    if(d.status == 1){

                        return `已录取`;
                    }else if(d.status == 2){

                        return `已取消`;
                    }else{

                        return '处理中';
                    }
                }
            }
        ]
}else{
    colsShow =  [
            {
                type: "number",
                title: "序号",
            },
			{
				field: "studentId",
				title: "学生学号",
				align: "center",
			},
			{
				field: "studentName",
				title: "学生姓名",
				align: "center",
			},
			{
				field: "companyName",
				title: "企业名称",
				align: "center",
			},
			{
				field: "jobName",
				title: "岗位名称",
				align: "center",
			},
			{
				field: "jobDuty",
				title: "岗位职责",
				align: "center",
			},
			{
				field: "snedTime",
				title: "投递时间",
				align: "center",
			},
			{
                title: "操作",
                template: (d)=>{

                    if(d.status == 0){

                        return `
                                <button type="button" event="pass" data="${d.id}" class="fater-btn fater-btn-primary fater-btn-sm">
                                    通过
                                </button>
                                <button type="button" event="cancel" data="${d.id}" class="fater-btn fater-btn-danger fater-btn-sm">
                                    取消
                                </button>
                                `;
                    }else if(d.status == 1){

                        return `
                                已录取
                                `;
                    }else if(d.status == 2){

                        return `
                                已取消
                                `;
                    }
                }
            }
        ]
}

$(function (){

    let tableView =  {
        el: "#tableShow",
        url: "/jobs/sendLogs/page/",
        method: "GET",
        where: {
            pageIndex: 1,
            pageSize: 10
        },
        page: true,
        cols: colsShow,
        binds: (d) =>{

            handle();
        }
    }
    $.table(tableView);

    $(".fater-btn-form-qry").on("click", ()=>{

        tableView.where["jobName"] = $("[name=para1]").val();
        tableView.where["studentName"] = $("[name=para2]").val();

        $.table(tableView);
    });

    $("button[event=add]").on("click", ()=>{

        $.model(".addWin");
    });

    $("#addFormBtn").on("click", ()=>{

        let formVal = $.getFrom("addForm");

        $.ajax({
            url: "/jobs/sendLogs/add/",
            type: "POST",
            data: formVal,
            success: function(res){
                if(res.code == 0){
                    $.alert(res.msg, () =>{

                        window.location.reload();
                    });
                }else{
                    $.msg("error", res.msg);
                }
            }
        });
    });

    $("#updFormBtn").on("click", ()=>{

        let formVal = $.getFrom("updForm");

        $.ajax({
            url: "/jobs/sendLogs/upd/",
            type: "POST",
            data: formVal,
            success: function(res){
                if(res.code == 0){
                    $.alert(res.msg, () =>{

                        window.location.reload();
                    });
                }else{
                    $.msg("error", res.msg);
                }
            }
        });
    });
});