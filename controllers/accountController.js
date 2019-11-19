var express = require('express');

var router = express.Router();
var config = require('../config/config');

var categoryRepo = require('../repos/categoryRepo'),
    brandRepo = require('../repos/brandRepo'),
    productRepo = require('../repos/productRepo');

/*booktore */
router.get('/', (req, res) => {
    var p1 = productRepo.productlatest();
    var p2 = productRepo.productbestview();
    var p3 = productRepo.bestsell();
    Promise.all([p1, p2, p3]).then(([latestRows, viewRows, sellRows]) => {
        //console.log(sellRows);
        for (let i = 0; i < sellRows.length; i++) {
            sellRows[i].Saling = false;
            sellRows[i].New = false;
            sellRows[i].Saleprice = sellRows[i].Price;
            if (sellRows[i].Sale != 0) {
                sellRows[i].Saling = true;
                sellRows[i].Saleprice = Math.floor(sellRows[i].Price * (100 - sellRows[i].Sale) / 100000) * 1000;
                sellRows[i].Salenumber = sellRows[i].Sale;
                sellRows[i].Oldprice = sellRows[i].Price;
            }
            var star = 0;
            var today = new Date();
            var date = sellRows[i].Date;
            var time = (today.getTime() - date.getTime()) / 1000;
            if (time < 15 * config.NEW_BOOK) {
                sellRows[i].New = true;
            }
            if (sellRows[i].View < 5) {
                star = 1;
            }
            else if (sellRows[i].View >= 5 && sellRows[i].View < 10) {
                star = 2;
            }
            else if (sellRows[i].View >= 10 && sellRows[i].View < 15) {
                star = 3;
            }
            else if (sellRows[i].View >= 15 && sellRows[i].View < 20) {
                star = 4;
            }
            else {
                star = 5;
            }
            var Star = [];
            var notStar = [];
            for (let i = 0; i < star; i++) {
                Star.push(1);
            }
            for (let i = 0; i < 5 - star; i++) {
                notStar.push(1);
            }
            sellRows[i].Star = Star;
            sellRows[i].notStar = notStar;
        }
        for (let i = 0; i < latestRows.length; i++) {
            latestRows[i].Saling = false;
            latestRows[i].New = false;
            latestRows[i].Saleprice = latestRows[i].Price;
            if (latestRows[i].Sale != 0) {
                latestRows[i].Saling = true;
                latestRows[i].Saleprice = Math.floor(latestRows[i].Price * (100 - latestRows[i].Sale) / 100000) * 1000;
                latestRows[i].Salenumber = latestRows[i].Sale;
                latestRows[i].Oldprice = latestRows[i].Price;
            }
            var star = 0;
            var today = new Date();
            var date = latestRows[i].Date;
            var time = (today.getTime() - date.getTime()) / 1000;
            if (time < 15 * config.NEW_BOOK) {
                latestRows[i].New = true;
            }
            if (latestRows[i].View < 5) {
                star = 1;
            }
            else if (latestRows[i].View >= 5 && latestRows[i].View < 10) {
                star = 2;
            }
            else if (latestRows[i].View >= 10 && latestRows[i].View < 15) {
                star = 3;
            }
            else if (latestRows[i].View >= 15 && latestRows[i].View < 20) {
                star = 4;
            }
            else {
                star = 5;
            }
            var Star = [];
            var notStar = [];
            for (let i = 0; i < star; i++) {
                Star.push(1);
            }
            for (let i = 0; i < 5 - star; i++) {
                notStar.push(1);
            }
            latestRows[i].Star = Star;
            latestRows[i].notStar = notStar;
        }
        for (let i = 0; i < viewRows.length; i++) {
            viewRows[i].Saling = false;
            viewRows[i].New = false;
            viewRows[i].Saleprice = viewRows[i].Price;
            if (viewRows[i].Sale != 0) {
                viewRows[i].Saling = true;
                viewRows[i].Saleprice = Math.floor(viewRows[i].Price * (100 - viewRows[i].Sale) / 100000) * 1000;
                viewRows[i].Salenumber = viewRows[i].Sale;
                viewRows[i].Oldprice = viewRows[i].Price;
            }
            var star = 0;
            var today = new Date();
            var date = viewRows[i].Date;
            var time = (today.getTime() - date.getTime()) / 1000;
            if (time < 15 * config.NEW_BOOK) {
                viewRows[i].New = true;
            }
            if (viewRows[i].View < 5) {
                star = 1;
            }
            else if (viewRows[i].View >= 5 && viewRows[i].View < 10) {
                star = 2;
            }
            else if (viewRows[i].View >= 10 && viewRows[i].View < 15) {
                star = 3;
            }
            else if (viewRows[i].View >= 15 && viewRows[i].View < 20) {
                star = 4;
            }
            else {
                star = 5;
            }
            var Star = [];
            var notStar = [];
            for (let i = 0; i < star; i++) {
                Star.push(1);
            }
            for (let i = 0; i < 5 - star; i++) {
                notStar.push(1);
            }
            viewRows[i].Star = Star;
            viewRows[i].notStar = notStar;
        }
        vm = {
            layout: 'index.handlebars',
            bestview: viewRows,
            latest: latestRows,
            sell: sellRows
        }
        res.render('bookstore/index/index', vm);
    });
});
router.get('/category/:id', (req, res) => {

    var limit = 9;

    var page = req.query.page;
    if (!page)
        page = 1;
    var offset = (page - 1) * limit;

    var p1 = productRepo.countProductsbyCategory(req.params.id);
    var p2 = productRepo.loadAllProductsbyCategory(req.params.id, limit, offset);
    var p3 = categoryRepo.single(req.params.id);

    Promise.all([p1, p2, p3]).then(([countRows, pRows, cRows]) => {
        var total = countRows[0].total;

        /*tính số page cần có */
        var nPage = Math.floor(total / limit);
        if (total % limit > 0)
            nPage++;
        /*end tính số page */

        var numbers = [];
        for (let i = 1; i <= nPage; i++) {
            numbers.push({
                value: i,
                isCurPage: i === +page
            });
        }

        var firstPage = {};
        var lastPage = {};
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i].isCurPage) {
                if (numbers[i].value === 1) {
                    firstPage = {
                        isFirstPage: true,
                        value: numbers[i].value
                    }
                    lastPage = {
                        isLastPage: false,
                        value: numbers[i].value + 1
                    }
                }
                else if (numbers[i].value === nPage) {
                    lastPage = {
                        isLastPage: true,
                        value: numbers[i].value
                    }
                    firstPage = {
                        isFirstPage: false,
                        value: numbers[i].value - 1
                    }
                }
                else {
                    lastPage = {
                        isLastPage: false,
                        value: numbers[i].value + 1
                    }
                    firstPage = {
                        isFirstPage: false,
                        value: numbers[i].value - 1
                    }
                }
            }
        }

        for (let i = 0; i < pRows.length; i++) {
            pRows[i].New = false;
            pRows[i].Saling = false;
            if (pRows[i].Sale != 0) {
                pRows[i].Saling = true;
                pRows[i].Saleprice = Math.floor(pRows[i].Price * (100 - pRows[i].Sale) / 100000) * 1000;
            }
            var star = 0;
            var today = new Date();
            var date = pRows[i].Date;
            var time = (today.getTime() - date.getTime()) / 1000;
            if (time < 5 * config.NEW_BOOK) {
                pRows[i].New = true;
            }
            if (pRows[i].View < 5) {
                star = 1;
            }
            else if (pRows[i].View >= 5 && pRows[i].View < 10) {
                star = 2;
            }
            else if (pRows[i].View >= 10 && pRows[i].View < 15) {
                star = 3;
            }
            else if (pRows[i].View >= 15 && pRows[i].View < 20) {
                star = 4;
            }
            else {
                star = 5;
            }
            var Star = [];
            var notStar = [];
            for (let i = 0; i < star; i++) {
                Star.push(1);
            }
            for (let i = 0; i < 5 - star; i++) {
                notStar.push(1);
            }
            pRows[i].Star = Star;
            pRows[i].notStar = notStar;
        }

        vm = {
            layout: 'index.handlebars',
            products: pRows,
            CateName: cRows.Name,
            page_numbers: numbers,
            firstPage: firstPage,
            lastPage: lastPage,
            limit: limit
        }
        res.render('bookstore/category/index', vm);
    });
});
router.post('/category/:id', (req, res) => {
    res.redirect('/category/' + req.params.id);
});
router.get('/brands/:id', (req, res) => {
    var limit = 9;

    var page = req.query.page;
    if (!page)
        page = 1;
    var offset = (page - 1) * limit;

    var p1 = productRepo.countProductsbyBrand(req.params.id);
    var p2 = productRepo.loadAllProductsbyBrand(req.params.id, limit, offset);
    var p3 = brandRepo.single(req.params.id);

    Promise.all([p1, p2, p3]).then(([countRows, pRows, cRows]) => {
        var total = countRows[0].total;

        /*tính số page cần có */
        var nPage = Math.floor(total / limit);
        if (total % limit > 0)
            nPage++;
        /*end tính số page */

        var numbers = [];
        for (let i = 1; i <= nPage; i++) {
            numbers.push({
                value: i,
                isCurPage: i === +page
            });
        }

        var firstPage = {};
        var lastPage = {};
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i].isCurPage) {
                if (numbers[i].value === 1) {
                    firstPage = {
                        isFirstPage: true,
                        value: numbers[i].value
                    }
                    lastPage = {
                        isLastPage: false,
                        value: numbers[i].value + 1
                    }
                }
                else if (numbers[i].value === nPage) {
                    lastPage = {
                        isLastPage: true,
                        value: numbers[i].value
                    }
                    firstPage = {
                        isFirstPage: false,
                        value: numbers[i].value - 1
                    }
                }
                else {
                    lastPage = {
                        isLastPage: false,
                        value: numbers[i].value + 1
                    }
                    firstPage = {
                        isFirstPage: false,
                        value: numbers[i].value - 1
                    }
                }
            }
        }

        for (let i = 0; i < pRows.length; i++) {
            pRows[i].New = false;
            pRows[i].Saling = false;
            if (pRows[i].Sale != 0) {
                pRows[i].Saling = true;
                pRows[i].Saleprice = Math.floor(pRows[i].Price * (100 - pRows[i].Sale) / 100000) * 1000;
            }
            var star = 0;
            var today = new Date();
            var date = pRows[i].Date;
            var time = (today.getTime() - date.getTime()) / 1000;
            if (time < 5 * config.NEW_BOOK) {
                pRows[i].New = true;
            }
            if (pRows[i].View < 5) {
                star = 1;
            }
            else if (pRows[i].View >= 5 && pRows[i].View < 10) {
                star = 2;
            }
            else if (pRows[i].View >= 10 && pRows[i].View < 15) {
                star = 3;
            }
            else if (pRows[i].View >= 15 && pRows[i].View < 20) {
                star = 4;
            }
            else {
                star = 5;
            }
            var Star = [];
            var notStar = [];
            for (let i = 0; i < star; i++) {
                Star.push(1);
            }
            for (let i = 0; i < 5 - star; i++) {
                notStar.push(1);
            }
            pRows[i].Star = Star;
            pRows[i].notStar = notStar;
        }

        vm = {
            layout: 'index.handlebars',
            products: pRows,
            CateName: cRows.Name,
            page_numbers: numbers,
            firstPage: firstPage,
            lastPage: lastPage,
            limit: limit
        }
        res.render('bookstore/brands/index', vm);
    });
});
router.post('/brands/:id', (req, res) => {
    res.redirect('/brands/' + req.params.id);
});
router.get('/products', (req, res) => {
    productRepo.single(req.query.id).then(rows => {
        rows.View++;
        var rows = rows;
        var p1 = productRepo.loadAllbyCategory(rows.CateId);
        var p2 = productRepo.loadAllbyBrand(rows.BraId);
        var p3 = productRepo.updateViewProduct(rows.id, rows.View);
        Promise.all([p1, p2, p3]).then(([cateRows, brandRows, value]) => {
            //console.log(cateRows);
            //console.log(brandRows);
            var arrCate = [];
            var arrBrand = [];
            if (cateRows.length > 6) {
                for (let i = 0; i < 6; i++) {
                    arrCate.push(cateRows[i]);
                }
            }
            else {
                arrCate = cateRows;
            }

            if (brandRows.length > 6) {
                for (let i = 0; i < 6; i++) {
                    arrBrand.push(brandRows[i]);
                }
            }
            else {
                arrBrand = brandRows;
            }

            var isSaling = false;
            var salePrice = 0;
            if (rows.Sale != 0) {
                isSaling = true;
                salePrice = Math.floor(rows.Price * (100 - rows.Sale) / 100000) * 1000;
            }
            rows.isSaling = isSaling;
            rows.newPrice = salePrice;


            var today = new Date();
            var date = rows.Date;
            var time = (today.getTime() - date.getTime()) / 1000;
            if (time < 15 * config.NEW_BOOK) {
                rows.New = true;
            }


            if (rows.View < 5) {
                star = 1;
            }
            else if (rows.View >= 5 && rows.View < 10) {
                star = 2;
            }
            else if (rows.View >= 10 && rows.View < 15) {
                star = 3;
            }
            else if (rows.View >= 15 && rows.View < 20) {
                star = 4;
            }
            else {
                star = 5;
            }
            var Star = [];
            var notStar = [];
            for (let i = 0; i < star; i++) {
                Star.push(1);
            }
            for (let i = 0; i < 5 - star; i++) {
                notStar.push(1);
            }
            rows.Star = Star;
            rows.notStar = notStar;
            for (let i = 0; i < arrCate.length; i++) {
                arrCate[i].Saling = false;
                arrCate[i].New = false;
                arrCate[i].Saleprice = arrCate[i].Price;
                if (arrCate[i].Sale != 0) {
                    arrCate[i].Saling = true;
                    arrCate[i].Saleprice = Math.floor(arrCate[i].Price * (100 - arrCate[i].Sale) / 100000) * 1000;
                    arrCate[i].Salenumber = arrCate[i].Sale;
                    arrCate[i].Oldprice = arrCate[i].Price;
                }
                var star = 0;
                var today = new Date();
                var date = arrCate[i].Date;
                var time = (today.getTime() - date.getTime()) / 1000;
                if (time < 15 * config.NEW_BOOK) {
                    arrCate[i].New = true;
                }
            }

            for (let i = 0; i < arrBrand.length; i++) {
                arrBrand[i].Saling = false;
                arrBrand[i].New = false;
                arrBrand[i].Saleprice = arrBrand[i].Price;
                if (arrBrand[i].Sale != 0) {
                    arrBrand[i].Saling = true;
                    arrBrand[i].Saleprice = Math.floor(arrBrand[i].Price * (100 - arrBrand[i].Sale) / 100000) * 1000;
                    arrBrand[i].Salenumber = arrBrand[i].Sale;
                    arrBrand[i].Oldprice = arrBrand[i].Price;
                }
                var star = 0;
                var today = new Date();
                var date = arrBrand[i].Date;
                var time = (today.getTime() - date.getTime()) / 1000;
                if (time < 15 * config.NEW_BOOK) {
                    arrBrand[i].New = true;
                }
            }
            vm = {
                layout: 'index.handlebars',
                product: rows,
                category: arrCate,
                brand: arrBrand
            }
            res.render('bookstore/product/index', vm);
        });
    });
});
module.exports = router;