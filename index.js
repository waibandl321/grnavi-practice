'use strict' 
{
    let keyId = '32757bae25bfc6ecd4d7c0a43d929d78';
    let baseUrl = 'https://api.gnavi.co.jp/RestSearchAPI/v3/';
    let url;
    

    const areaSearchBtn = document.querySelector('#area-search');
    const areaSearchValue = document.querySelector('#area');

    const columns = document.querySelector('.columns')
    let prevBtn = document.querySelector('#prev');
    let nextBtn = document.querySelector('#next');


    areaSearchBtn.addEventListener('click', areaSearch);
    // prefSearchBtn.addEventListener('click', prefSearch);
    // categorySearchBtn.addEventListener('click', categorySearch);
    nextBtn.addEventListener('click', addCountPageOffSet);
    prevBtn.addEventListener('click', reduceCountPageOffSet);

    let offsetPage = 1;

    function areaSearch(e) {
        e.preventDefault();
        console.log('地域検索');
        console.log(areaSearchValue.value);
        if(areaSearchValue !== '') {
            url = baseUrl + '?keyid=' + keyId + '&area=' + areaSearchValue.value + '&offset_page=' + offsetPage;
            fetch(url).then(function(result) {
                return result.json();
            }).then(function(json) {
                console.log(json);
                areaResult(json);
            })
        }
    };

    function areaResult(json) {
        while (columns.firstChild) {
            columns.removeChild(columns.firstChild);
        }

        let rests = json.rest;
        console.log(rests)

        for(let j = 0; j < rests.length; j++) {
            console.log(rests[j].name);
            const link = document.createElement('a');
            const para = document.createElement('p');
            const image = document.createElement('img');
            const div = document.createElement('div');
            div.classList.add('column');
            link.href = rests[j].url;
            para.textContent = rests[j].name;
            image.src = rests[j].image_url.shop_image1;
            columns.appendChild(div);
            div.appendChild(link);
            link.appendChild(image);
            link.appendChild(para);
        }
    }


    // function prefSearch() {
    //     console.log('都道府県検索');
    //     console.log(prefSearchValue.value);
    //     if(prefSearchValue !== '') {
    //         url = baseUrl + '?keyid=' + keyId + '&pref=' + prefSearchValue.value;
    //         fetch(url).then(function(result) {
    //             return result.json();
    //         }).then(function(json) {
    //             console.log(json);
    //             prefResult(json);
    //         })
    //     }
    // };

    // function categorySearch() {
    //     console.log('カテゴリー検索');
    // };

    function addCountPageOffSet(e) {
        offsetPage++;
        console.log(offsetPage);
        areaSearch(e);
        areaResult(json);
    }
    function reduceCountPageOffSet(e) {
        if(offsetPage > 1) {
            offsetPage--;
        } else {

            return;
        }
        areaSearch(e);
        areaResult(json);
    }
}

