//Pagination


window.sessionStorage;
//Display value
var currentPage = 1;
var totPages = 1;
var records ;
var rowLength = sessionStorage.getItem("records");
var PerPagesize = 7;
//sessionStorage.setItem("countPerPage",PerPagesize);
var pagerName;
// var driverCount = sessionStorage.getItem("driverCount");

var pager = new Pager('tablebody', PerPagesize);
pager.init();
pager.showPageNav('pager', 'pageNavPosition');

//pager.showPage(1);
var noOfPages = this.currentPage * PerPagesize;
if (noOfPages > records) {
	this.noOfPages = records;
}
var showingPage = document.getElementById('showPage');
showingPage.innerHTML = "<label>Showing " + this.noOfPages + " results out of " + records + "</label>";

function Pager(tableName, itemsPerPage) {

	this.tableName = tableName;
	this.currentPage = 1;
	this.pages = 0;
	this.inited = false;

	this.showRecords = function(from, to) {
		var rows = document.getElementById(tableName).rows;
		for (var i = 0; i < rows.length; i++) {
			if (i < from || i > to)
				rows[i].style.display = 'none';
			else
				rows[i].style.display = '';
		}
	}

	this.showPage = function(pageNumber) {

		if (!this.inited) {
			alert("not inited");
			return;
		}

		var oldPageAnchor = document.getElementById('pg' + this.currentPage);
		oldPageAnchor.className = 'pg-normal';

		this.currentPage = pageNumber;
		var newPageAnchor = document.getElementById('pg' + this.currentPage);
		newPageAnchor.className = 'pg-selected';

		var from = (pageNumber - 1) * (Number(itemsPerPage));
		var to = (from + Number(itemsPerPage)) - 1;
		this.showRecords(from, to);
		var pagerName = 'pager';

		var pgNext = document.getElementById(pagerName + 'pgNext');

		var pgPrev = document.getElementById(pagerName + 'pgPrev');

		if (pgNext != null) {
			if (this.currentPage == this.pages) pgNext.style.display = 'none';
			else pgNext.style.display = '';
		}
		if (pgPrev != null) {
			if (this.currentPage == 1) pgPrev.style.display = 'none';
			else pgPrev.style.display = '';
		}
		var noOfPages = this.currentPage * PerPagesize;

		if (noOfPages > records) {
			noOfPages = records;
		}
		var showingPage = document.getElementById('showPage');
		showingPage.innerHTML = "<label>Showing " + noOfPages + " results out of " + records + "</label>";

		document.getElementById("showPage").innerText = 'Display : ' + $('#tablebody > tr:not([style*="display: none"])').length+ " out of " + rowLength;


	}

	this.prev = function() {
		if (this.currentPage > 1) {
			this.createPager(this.currentPage - 4, this.currentPage); // it  used to move the cursor to privious index.
			this.showPage(this.currentPage - 1);
		}
	}

	this.next = function() {
		if (this.currentPage < this.pages) {
			this.createPager(this.currentPage, this.currentPage + 4);  //when i click the next button it is count the records      upto 5 . So indexing   is mainting the standed.

			this.showPage(this.currentPage + 1);  //it is used to print  imediate next records.


		}
	}

	this.init = function() {
		var rows = rowLength;
		records = (rows);
		this.pages = Math.ceil(records / itemsPerPage);
		this.inited = true;

	}



	//it is used to  move the cursor upto 5 records.
	this.createPager = function(startEle, EndEle) {


		if (EndEle <= this.pages && startEle > 0) {

			var pagerName = document.querySelector(':root');
			pagerName = 'pager';




			var pagerHtml = ' <span id="' + pagerName + 'pgPrev" onclick="' + pagerName + '.prev();" class="pg-normal">  <img src="pagination-prev-arrow.svg" alt="page-arrow" width="18" height="15"/> </span> &nbsp; ';



			var element = document.getElementById("pageNavPosition");
			for (var page = startEle; page <= EndEle; page++)


				pagerHtml += ' <span id="pg' + page + '" class="pg-normal" onclick="' + pagerName + '.showPage(' + page + ');">' + page + ' </span> &nbsp; ';;


			pagerHtml += ' <span id="' + pagerName + 'pgNext" onclick="' + pagerName + '.next();" class="pg-normal">   <img id ="pagination-arrow" src="pagination-next-arrow.svg" width="18" height="15" alt="page-arrow" /> </span> ';

			element.innerHTML = pagerHtml;

		}

	}

	this.showPageNav = function(pagerName, positionId) {

		if (!this.inited) {
			alert("not inited");
			return;
		}


		var pagerHtml = ' <span id="' + pagerName + 'pgPrev" onclick="' + pagerName + '.prev();" class="pg-normal"> <img src="Images/pagination-prev-arrow.svg" alt="page-arrow" width="18" height="15"/> </span> &nbsp;  ';


		//for printing number of indexes per page

		if (this.pages >= 5) {
			// alert("pages value"+this.pages);
			this.totPages = 5
		}
		else {
			this.totPages = this.pages;
		}

		//it is used to print the  fixed 5 records.
		var element = document.getElementById(positionId);

		for (var page = 1; page <= this.totPages; page++)
			pagerHtml += ' <span id="pg' + page + '" class="pg-normal" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '  </span> &nbsp;';
		if (this.currentPage != this.totPages) {

			pagerHtml += ' <span id="' + pagerName + 'pgNext" onclick="' + pagerName + '.next();" class="pg-normal">  <img src="Images/pagination-next-arrow.svg" width="18" height="15" alt="page-arrow" />    </span> ';
		}
		element.innerHTML = pagerHtml;
	}


}