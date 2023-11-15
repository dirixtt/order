const partners = [
    {
        id: 0,
        name: "ИП Перов Е.А.",
        republic: "Архангельская область",
        city: "Архангельск",
        tradeType: "retail",
        coordinates: [64.527903, 40.568107],
        active: false,
        service: "montaj",
        platform: "offline",
        type: "Heating and hot water supply",
        cityZoom: 7,
        regionZoom: 3,
    },
    {
        id: 1,
        name: "ИП Жиляков Валерий Николаевич",
        republic: "Астраханская область",
        city: "Астрахань",
        tradeType: "wholesale",
        platform: "online",
        coordinates: [46.367138, 48.041075],
        active: false,
        service: "remont",
        type: "Pool equipment",
        cityZoom: 10,
        regionZoom: 3,
    },
    {
        id: 2,
        name: "ИП Курятников Сергей Алексеевич",
        republic: "Астраханская область",
        city: "Астрахань",
        tradeType: "retail",
        platform: "offline",
        service: "montaj",
        coordinates: [46.368158, 48.095055],
        active: false,
        type: "Pool equipment",
        cityZoom: 10,
        regionZoom: 3,
    },
    {
        id: 3,
        name: "ООО \"Акваметр\"",
        republic: "Алтайский край",
        city: "Барнаул",
        tradeType: "retail",
        platform: "online",
        service: "montaj",
        coordinates: [53.346785, 83.776856],
        active: false,
        type: "Sewerage removal",
        cityZoom: 10,
        regionZoom: 3,
    },
    {
        id: 4,
        name: "ИП Бартасова Н.И.",
        republic: "Московская область",
        city: "Москва",
        tradeType: "wholesale",
        platform: "offline",
        service: "montaj",
        coordinates: [55.755864, 37.617698],
        active: false,
        type: "Sewerage removal",
        cityZoom: 10,
        regionZoom: 3,
    },
    {
        id: 5,
        name: "ООО «Аделло Групп»",
        tradeType: "wholesale",
        platform: "offline",
        service: "remont",
        republic: "Московская область",
        city: "Москва",
        coordinates: [55.846623, 37.162818],
        active: false,
        type: "Sewerage removal",
        cityZoom: 10,
        regionZoom: 3,
    },
    {
        id: 6,
        name: "ООО \"ВИС-Сервис\"",
        tradeType: "wholesale",
        platform: "online",
        service: "remont",
        republic: "Московская область",
        city: "Москва",
        coordinates: [55.862929, 37.648367],
        active: false,
        type: "water supply and watering",
        cityZoom: 10,
        regionZoom: 3,
    }

];


ymaps.ready(init);

function init() {
    var myMapTemp = new ymaps.Map("map", {
        center: [54.989347, 73.368221],
        zoom: 3,
        controls: ['zoomControl'],
    }, {
        zoomControlSize: 'auto',
        zoomControlPosition: { right: 20, bottom: 50 },
        searchControlProvider: 'yandex#search',
    });

    var myPlacemarkWithContent_1 = new ymaps.Placemark([55.679214, 37.605921], {
        hintContent: '',
        balloonContent: '',
        preset: 'islands#blackStretchyIcon',
        draggable: true,
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'assets/img/svg/pinmap.svg',
        iconImageSize: [131, 112],
        iconImageOffset: [-25, -50],
        iconContentOffset: [15, 15],
        hideIconOnBalloonOpen: false
    });

    myMapTemp.geoObjects.add(myPlacemarkWithContent_1);
    const republicList = document.getElementById('res_select');
    const republics = Object.keys(getCoordinatesForRegion('all'));
    const childCheckboxes = document.querySelectorAll('input[type="checkbox"][name^="filter-param"]');
    const allcheckboxes = document.querySelectorAll('.map input[type="checkbox"]');

    republics.forEach(republic => {
        const listItem = document.createElement("li");
        listItem.setAttribute("value", republic);
        listItem.textContent = republic;
        republicList.appendChild(listItem);
    });
    const allDrops = document.querySelectorAll('.map__list-in .map__list-item');
    let DATA = partners
    const mapListContainer = document.querySelector('.map__list-in');
    const originalDrops = Array.from(allDrops);
    let selectedRegion = "Все"
    const listItems = document.querySelectorAll('#res_select li');
    const listItemsForCities = document.querySelectorAll('#city_list li');
    const addresses = document.querySelectorAll('.map__list-tx');

    function showDetail(id) {
        const fdata = DATA.filter(i => i.id == id);
        console.log(fdata[0].coordinates);
        // Assuming myMapTemp is a valid map object with a setCenter method
        resetPlacemarks()
        myMapTemp.setCenter(fdata[0].coordinates, 10);
    }

    addresses.forEach((element) => {
        element.addEventListener('click', () => {
            const partnerId = element.getAttribute('partner-id');
            showDetail(partnerId);
        });
    });


    function removeCheck() {
        allcheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
    function resetPlacemarks() {
        myMapTemp.geoObjects.each(function (placemark) {
            placemark.options.set("preset", "islands#grayIcon");
            placemark.properties.set("iconContent", "");



        });
    }




    if (listItemsForCities.length === 0) {
        const cityList = document.getElementById('city_list');
        cityList.innerHTML = ''; // Clear the current list
        const allOption = document.createElement('li');
        allOption.setAttribute('value', 'Все');
        allOption.textContent = 'Все';
        cityList.appendChild(allOption);
        allOption.addEventListener('click', function () {
            // const filtredRegions = partners.map(i => i.city)
            // const regions = [...new Set(filtredRegions)];
            // populateRespublicList(republicList, regions) 
            const placemarks = []
            placemarks.forEach(placemark => {
                placemark.options.set("preset", "islands#grayIcon");
                placemark.properties.set("iconContent", "");
            })
            const selectedCity = this.getAttribute('value');
            const region = document.getElementById('city');
            region.innerHTML = selectedCity ? selectedCity : '';
            const dropdownTitle = document.querySelector('.icon');
            if (dropdownTitle.classList.contains('open')) {
                dropdownTitle.classList.remove('open');
            }
            myMapTemp.geoObjects.removeAll();

            allDrops.forEach(drop => {
                if (drop.classList.contains("open")) {
                    drop.classList.remove("open")
                }
            })
            const fpartenrsId = partners.map(partner => partner.id);

            originalDrops.forEach(element => {
                mapListContainer.appendChild(element);
            });
            const filtredDropElements = [];
            const commonElements = [];

            allDrops.forEach(element => {
                filtredDropElements.push(element);
            });

            for (const elementId of fpartenrsId) {
                for (const element of filtredDropElements) {
                    const partnerId = element.getAttribute('data-partner-id');
                    if (partnerId === elementId.toString()) {
                        commonElements.push(element);
                    }
                }
            }


            mapListContainer.innerHTML = '';
            // Append the filtered elements back to the mapListContainer
            commonElements.forEach(element => {
                mapListContainer.appendChild(element);
            });




            partners.forEach(function (partner) {
                var placemark = new ymaps.Placemark(partner.coordinates, {
                    // iconContent: partner.name
                }, {
                    preset: partner.active ? 'islands#redIcon' : 'islands#grayStretchyIcon',
                    balloonCloseButton: true,
                    balloonContentBody: "Телефон: " + partner.phone + "<br>Сайт: <a href='" + partner.url + "' target='_blank'>" + partner.url + "</a>",
                    hideIconOnBalloonOpen: false
                });


                if (partner.active === false) {
                    // Add placemark to the map
                    placemark.events.add("mouseenter", () => {
                        if (clickedMarker !== placemark && !partner.active) {
                            placemark.options.set("preset", "islands#grayStretchyIcon");
                            placemark.properties.set("iconContent", partner.name);
                        }
                        console.log(partner.active);
                    });

                    placemark.events.add("mouseleave", () => {
                        if (clickedMarker !== placemark && !partner.active) {
                            placemark.options.set("preset", "islands#grayIcon");
                            placemark.properties.set("iconContent", "");
                        }
                    });
                }


                placemark.events.add("click", () => {
                    if (clickedMarker !== placemark) {
                        if (clickedMarker) {
                            const previousPartner = partners.find(p => p.coordinates === clickedMarker.geometry.getCoordinates());
                            previousPartner.active = false;
                            clickedMarker.options.set("preset", "islands#grayIcon");
                            clickedMarker.properties.set("iconContent", clickedMarker.options.get('iconContent'));
                            const previousPartnerData = document.querySelector(`[data-partner-id="${previousPartner.id}"]`);
                            const previousDropdown = previousPartnerData.querySelector('.map__list-drop');
                            previousPartnerData.classList.remove("open");
                            // previousDropdown.style.display = "none";
                        }

                        clickedMarker = placemark;

                        // Customize the partner's marker based on their active state
                        partner.active = true;
                        placemark.options.set("preset", "islands#redStretchyIcon");

                        // Handle the dropdown and other DOM elements

                        const partnerData = document.querySelector(`[data-partner-id="${partner.id}"]`);


                        partnerData.classList.add("open");
                        // dropdown.style.display = "block";
                    } else {
                        partner.active = false;
                        placemark.options.set("preset", "islands#grayStretchyIcon");
                        placemark.properties.set("iconContent", partner.name);
                        const partnerData = document.querySelector(`[data-partner-id="${partner.id}"]`);

                        partnerData.classList.remove("open");

                        clickedMarker = null;
                    }
                });
                placemarks.push(placemark);

                handleDrop(partners, placemarks, placemark)

                myMapTemp.geoObjects.add(placemark);
            });
            resetPlacemarks()
            removeCheck()
            // Set the center of the map to a suitable location
            myMapTemp.setCenter([55.755863, 37.617700], 3); // Adjust coordinates and zoom level as needed
        });



        const cities = Array.from(new Set(partners.map(partner => partner.city)));
        cities.forEach(city => {
            const listItem = document.createElement('li');
            listItem.setAttribute('value', city);
            listItem.textContent = city;

            // Add click event listener for each city
            listItem.addEventListener('click', function () {
                const placemarks = []
                removeCheck()
                const selectedCity = this.getAttribute('value');
                const city = document.getElementById('city');
                city.innerHTML = selectedCity ? selectedCity : '';
                const filtredRegions = getRegionsForCities(selectedCity)
                const regions = [...new Set(filtredRegions)];
                selectedRegion = regions
                const region = document.getElementById('region');
                region.innerHTML = selectedRegion ? selectedRegion : regions;
                console.log(regions)
                // Close the dropdown if it's open
                const dropdownTitle = document.querySelector('.icon');
                if (dropdownTitle.classList.contains('open')) {
                    dropdownTitle.classList.remove('open');
                }
                placemarks.forEach(placemark => {
                    placemark.options.set("preset", "islands#grayIcon");
                    placemark.properties.set("iconContent", "");
                })
                // Filter and display partners based on the selected city
                myMapTemp.geoObjects.removeAll();

                // Create placemarks for the filtered partners
                const filteredPartners = selectedCity === "Все" ? partners : partners.filter(partner => partner.city === selectedCity);
                const fpartenrsId = filteredPartners.map(partner => partner.id);
                DATA = filteredPartners
                allDrops.forEach(drop => {
                    if (drop.classList.contains("open")) {
                        drop.classList.remove("open")
                    }
                })
                originalDrops.forEach(element => {
                    mapListContainer.appendChild(element);
                });
                const filtredDropElements = [];
                const commonElements = [];

                allDrops.forEach(element => {
                    filtredDropElements.push(element);
                });

                for (const elementId of fpartenrsId) {
                    for (const element of filtredDropElements) {
                        const partnerId = element.getAttribute('data-partner-id');
                        if (partnerId === elementId.toString()) {
                            commonElements.push(element);
                        }
                    }
                }

                mapListContainer.innerHTML = '';
                // Append the filtered elements back to the mapListContainer
                commonElements.forEach(element => {
                    mapListContainer.appendChild(element);
                });

                // Create placemarks for the filtered partners
                filteredPartners.forEach(function (filteredPartner) {

                    var placemark = new ymaps.Placemark(filteredPartner.coordinates, {
                        // iconContent: filteredPartner.name


                    }, {
                        preset: filteredPartner.active ? 'islands#redIcon' : 'islands#grayStretchyIcon',
                        balloonCloseButton: true,
                        balloonContentBody: "Телефон: " + filteredPartner.phone + "<br>Сайт: <a href='" + filteredPartner.url + "' target='_blank'>" + filteredPartner.url + "</a>",
                        hideIconOnBalloonOpen: false



                    });

                    if (filteredPartner.active === false) {
                        // Add placemark to the map
                        placemark.events.add("mouseenter", () => {
                            if (clickedMarker !== placemark && !filteredPartner.active) {
                                placemark.options.set("preset", "islands#grayStretchyIcon");
                                placemark.properties.set("iconContent", filteredPartner.name);
                            }
                            console.log(filteredPartner.active);
                        });

                        placemark.events.add("mouseleave", () => {
                            if (clickedMarker !== placemark && !filteredPartner.active) {
                                placemark.options.set("preset", "islands#grayIcon");
                                placemark.properties.set("iconContent", "");
                            }
                        });
                    }

                    placemark.events.add("click", () => {
                        if (clickedMarker !== placemark) {
                            if (clickedMarker) {
                                const previousPartner = partners.find(p => p.coordinates === clickedMarker.geometry.getCoordinates());
                                previousPartner.active = false;
                                clickedMarker.options.set("preset", "islands#grayIcon");
                                clickedMarker.properties.set("iconContent", clickedMarker.options.get('iconContent'));
                                const previousPartnerData = document.querySelector(`[data-partner-id="${previousPartner.id}"]`);
                                const previousDropdown = previousPartnerData.querySelector('.map__list-drop');
                                previousPartnerData.classList.remove("open");
                                // previousDropdown.style.display = "none";
                            }

                            clickedMarker = placemark;

                            // Customize the partner's marker based on their active state
                            filteredPartner.active = true;
                            placemark.options.set("preset", "islands#redStretchyIcon");

                            // Handle the dropdown and other DOM elements
                            const partnerData = document.querySelector(`[data-partner-id="${filteredPartner.id}"]`);


                            partnerData.classList.add("open");
                            // dropdown.style.display = "block";
                        } else {
                            filteredPartner.active = false;
                            placemark.options.set("preset", "islands#grayStretchyIcon");
                            placemark.properties.set("iconContent", filteredPartner.name);
                            const partnerData = document.querySelector(`[data-partner-id="${filteredPartner.id}"]`);

                            partnerData.classList.remove("open");

                            clickedMarker = null;
                        }
                    });
                    placemarks.push(placemark);

                    handleDrop(filteredPartners, placemarks, placemark)
                    resetPlacemarks()
                    myMapTemp.geoObjects.add(placemark);
                });
                const coordinates = getCoordinatesForCity(selectedCity);
                const cityZoom = partners.filter((i) => i.city === selectedCity).map((i) => i.cityZoom);

                myMapTemp.setCenter(coordinates, cityZoom[0]);
            });
            cityList.appendChild(listItem);
        });


        listItems.forEach((item) => {

            item.addEventListener('click', function () {
                const city = document.getElementById('city');
                city.innerHTML = 'Выберите город';
                selectedRegion = this.getAttribute('value');
                const region = document.getElementById('region');
                region.innerHTML = selectedRegion ? selectedRegion : '';

                funcOfCities = getCitiesForRegion(selectedRegion);
                const cities = [...new Set(funcOfCities)];
                removeCheck()
                populateCityList(cityList, cities);
                // Close the dropdown if it's open
                const dropdownTitle = document.querySelector('.map__filter-select-title');
                if (dropdownTitle.classList.contains('open')) {
                    dropdownTitle.classList.remove('open');
                }
                allDrops.forEach(drop => {
                    if (drop.classList.contains("open")) {
                        drop.classList.remove("open")
                    }
                })
                const listItemsForCities = document.querySelectorAll('#city_list li');

                const filteredPartners = selectedRegion === "Все"
                    ? partners
                    : partners.filter(partner => partner.republic === selectedRegion);

                myMapTemp.geoObjects.removeAll();
                const fpartenrsId = filteredPartners.map(partner => partner.id);
                mapListContainer.innerHTML = '';

                originalDrops.forEach(element => {
                    mapListContainer.appendChild(element);
                });
                const filtredDropElements = [];
                const commonElements = [];

                allDrops.forEach(element => {
                    filtredDropElements.push(element);
                });

                for (const elementId of fpartenrsId) {
                    for (const element of filtredDropElements) {
                        const partnerId = element.getAttribute('data-partner-id');
                        if (partnerId === elementId.toString()) {
                            commonElements.push(element);
                        }
                    }
                }
                mapListContainer.innerHTML = '';

                // Append the filtered elements back to the mapListContainer
                commonElements.forEach(element => {
                    mapListContainer.appendChild(element);
                });

                DATA = filteredPartners
                filteredPartners.map((partner) => {
                    var placemarks = [];
                    var placemark = new ymaps.Placemark(partner.coordinates, {
                        // iconContent: partner.name
                    }, {
                        preset: partner.active ? 'islands#redIcon' : 'islands#grayStretchyIcon',
                        balloonCloseButton: true,
                        balloonContentBody: "Телефон: " + partner.phone + "<br>Сайт: <a href='" + partner.url + "' target='_blank'>" + partner.url + "</a>",
                        hideIconOnBalloonOpen: false
                    });

                    if (partner.active === false) {
                        // Add placemark to the map
                        placemark.events.add("mouseenter", () => {
                            if (clickedMarker !== placemark && !partner.active) {
                                placemark.options.set("preset", "islands#grayStretchyIcon");
                                placemark.properties.set("iconContent", partner.name);
                            }
                            console.log(partner.active);
                        });

                        placemark.events.add("mouseleave", () => {
                            if (clickedMarker !== placemark && !partner.active) {
                                placemark.options.set("preset", "islands#grayIcon");
                                placemark.properties.set("iconContent", "");
                            }
                        });
                    }

                    placemark.events.add("click", () => {
                        if (clickedMarker !== placemark) {
                            if (clickedMarker) {
                                const previousPartner = partners.find(p => p.coordinates === clickedMarker.geometry.getCoordinates());
                                previousPartner.active = false;
                                clickedMarker.options.set("preset", "islands#grayIcon");
                                clickedMarker.properties.set("iconContent", clickedMarker.options.get('iconContent'));
                                const previousPartnerData = document.querySelector(`[data-partner-id="${previousPartner.id}"]`);
                                previousPartnerData.classList.remove("open");
                                // previousDropdown.style.display = "none";
                            }

                            clickedMarker = placemark;

                            // Customize the partner's marker based on their active state
                            partner.active = true;
                            placemark.options.set("preset", "islands#redStretchyIcon");

                            // Handle the dropdown and other DOM elements

                            const partnerData = document.querySelector(`[data-partner-id="${partner.id}"]`);


                            partnerData.classList.add("open");
                            // dropdown.style.display = "block";
                        } else {
                            partner.active = false;
                            placemark.options.set("preset", "islands#grayStretchyIcon");
                            placemark.properties.set("iconContent", partner.name);
                            const partnerData = document.querySelector(`[data-partner-id="${partner.id}"]`);

                            partnerData.classList.remove("open");

                            clickedMarker = null;
                        }
                    });
                    placemarks.push(placemark);
                    handleDrop(filteredPartners, placemarks, placemark)

                    resetPlacemarks()

                    myMapTemp.geoObjects.add(placemark);

                });

                const placemarks = [];
                listItemsForCities.forEach((item) => {
                    item.addEventListener('click', function () {
                        const selectedCity = this.getAttribute('value');
                        let region = document.getElementById('city');
                        region.innerHTML = selectedCity ? selectedCity : '';
                        // Close the dropdown if it's open
                        const dropdownTitle = document.querySelector('.icon');
                        if (dropdownTitle.classList.contains('open')) {
                            dropdownTitle.classList.remove('open');
                        }

                        removeCheck()

                        allDrops.forEach(drop => {
                            if (drop.classList.contains("open")) {
                                drop.classList.remove("open")
                            }
                        })
                        // Очистка массива меток
                        placemarks.forEach((placemark) => {
                            placemark.options.set("preset", "islands#grayIcon");
                            placemark.properties.set("iconContent", "");
                            myMapTemp.geoObjects.remove(placemark);
                        });

                        const filteredPartnersForCity = selectedCity === "Все"
                            ? partners
                            : filteredPartners.filter(partner => partner.city === selectedCity);

                        DATA = filteredPartnersForCity
                        filteredPartnersForCity.forEach(function (filteredPartner) {
                            var placemark = new ymaps.Placemark(filteredPartner.coordinates, {
                                // iconContent: filteredPartner.name
                            }, {
                                preset: filteredPartner.active ? 'islands#redIcon' : 'islands#grayStretchyIcon',

                                balloonCloseButton: true,
                                balloonContentBody: "Телефон: " + filteredPartner.phone + "<br>Сайт: <a href='" + filteredPartner.url + "' target='_blank'>" + filteredPartner.url + "</a>",
                                hideIconOnBalloonOpen: false
                            });
                            if (filteredPartner.active === false) {
                                // Add placemark to the map
                                placemark.events.add("mouseenter", () => {
                                    if (clickedMarker !== placemark && !filteredPartner.active) {
                                        placemark.options.set("preset", "islands#grayStretchyIcon");
                                        placemark.properties.set("iconContent", filteredPartner.name);
                                    }
                                    console.log(filteredPartner.active);
                                });

                                placemark.events.add("mouseleave", () => {
                                    if (clickedMarker !== placemark && !filteredPartner.active) {
                                        placemark.options.set("preset", "islands#grayIcon");
                                        placemark.properties.set("iconContent", "");
                                    }
                                });
                            }

                            placemark.events.add("click", () => {
                                console.log("first")
                                if (clickedMarker !== placemark) {
                                    if (clickedMarker) {
                                        const filteredPartner = partners.find(p => p.coordinates === clickedMarker.geometry.getCoordinates());
                                        filteredPartner.active = false;
                                        clickedMarker.options.set("preset", "islands#grayIcon");
                                        clickedMarker.properties.set("iconContent", clickedMarker.options.get('iconContent'));
                                        const previousPartnerData = document.querySelector(`[data-partner-id="${filteredPartner.id}"]`);
                                        const previousDropdown = previousPartnerData.querySelector('.map__list-drop');
                                        previousPartnerData.classList.remove("open");
                                        // previousDropdown.style.display = "none";
                                    }

                                    clickedMarker = placemark;

                                    // Customize the partner's marker based on their active state
                                    filteredPartner.active = true;
                                    placemark.options.set("preset", "islands#redStretchyIcon");

                                    // Handle the dropdown and other DOM elements
                                    const partnerData = document.querySelector(`[data-partner-id="${filteredPartner.id}"]`);


                                    partnerData.classList.add("open");
                                    // dropdown.style.display = "block";
                                } else {
                                    filteredPartner.active = false;
                                    placemark.options.set("preset", "islands#grayStretchyIcon");
                                    placemark.properties.set("iconContent", filteredPartner.name);
                                    const partnerData = document.querySelector(`[data-partner-id="${filteredPartner.id}"]`);

                                    partnerData.classList.remove("open");

                                    clickedMarker = null;
                                }
                            });
                            // const placemarks = []
                            placemarks.push(placemark)

                            handleDrop(filteredPartnersForCity, placemarks, placemark)
                            resetPlacemarks()

                            myMapTemp.geoObjects.add(placemark);
                        });
                        const fpartenrsId = filteredPartnersForCity.map(partner => partner.id);

                        originalDrops.forEach(element => {
                            mapListContainer.appendChild(element);
                        });
                        const filtredDropElements = [];
                        const commonElements = [];

                        allDrops.forEach(element => {
                            filtredDropElements.push(element);
                        });


                        for (const elementId of fpartenrsId) {
                            for (const element of filtredDropElements) {
                                const partnerId = element.getAttribute('data-partner-id');
                                if (partnerId === elementId.toString()) {
                                    commonElements.push(element);
                                }
                            }
                        }


                        mapListContainer.innerHTML = '';
                        // Append the filtered elements back to the mapListContainer
                        commonElements.forEach(element => {
                            mapListContainer.appendChild(element);
                        });
                        const coordinates = getCoordinatesForCity(selectedCity);
                        const cityZoom = partners.filter((i) => i.city === selectedCity).map((i) => i.cityZoom);

                        myMapTemp.setCenter(coordinates, cityZoom[0]); // Adjust the zoom level as needed

                    });
                });


                const coordinates = getCoordinatesForRegion(selectedRegion);
                const regionZoom = partners.filter((i) => i.republic === selectedRegion).map((i) => i.regionZoom);

                myMapTemp.setCenter(coordinates, regionZoom[0]); // Adjust the zoom level as needed

            });
        });




        function populateCityList(cityList, city) {
            // Clear the current list by removing all child nodes
            while (cityList.firstChild) {
                cityList.removeChild(cityList.firstChild);
            }

            city.forEach(region => {
                const listItem = document.createElement("li");
                listItem.setAttribute("value", region);
                listItem.textContent = region;
                cityList.appendChild(listItem);
            });
        }
        let clickedMarker = null; // Variable to keep track of the clicked marker


        const selectAllCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="filter-param-all"]');

        selectAllCheckboxes.forEach(selectAllCheckbox => {
            selectAllCheckbox.addEventListener('change', function () {
                const group = this.name.slice(-1);
                const associatedChildCheckboxes = document.querySelectorAll(`input[type="checkbox"][name="filter-param${group}"]`);
                associatedChildCheckboxes.forEach(childCheckbox => {
                    childCheckbox.checked = this.checked;
                });
            });
        });

        childCheckboxes.forEach(childCheckbox => {
            childCheckbox.addEventListener('change', function () {
                const group = this.name.slice(-1);
                const associatedSelectAllCheckbox = document.querySelector(`input[type="checkbox"][id="filter-param-all${group}"]`);
                const areAllChildCheckboxesChecked = Array.from(childCheckboxes)
                    .filter(checkbox => checkbox.name === this.name)
                    .every(checkbox => checkbox.checked);
                associatedSelectAllCheckbox.checked = areAllChildCheckboxesChecked;
                showPlacemarks()
            });
        });




        const checkboxes = document.querySelectorAll(".filter");
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", filterPartners);
        });



        let filteredPartners = []
        function filterPartners() {
            console.log("data :", DATA.length)
            const selectedValues = Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            filteredPartners = DATA.filter(partner => {
                return Object.values(partner).some(value => {
                    // Check if the value matches any selected value
                    return selectedValues.includes(value);
                });
            });
            console.log("filteredPartners", filteredPartners.length)
            // Display or use the filtered partners based on your requirements
            showPlacemarks()
        }


        function showPlacemarks() {
            myMapTemp.geoObjects.removeAll(); // Clear existing placemarks
            // mapListContainer.innerHTML = ''; // Clear the contents of the container

            const show = filteredPartners.length > 0 ? filteredPartners : DATA || partners; // Determine partners to display
            console.log("show", show.length)

            show.forEach((partner) => {
                const placemark = new ymaps.Placemark(partner.coordinates, {
                    iconContent: "",
                }, {
                    // Customize placemark appearance
                    preset: partner.active ? "islands#redStretchyIcon" : "islands#grayIcon",
                    balloonCloseButton: true,
                    balloonContentBody: "Телефон: " + partner.phone + "<br>Сайт: <a href='" + partner.url + "' target='_blank'>" + partner.url + "</a>",
                    hideIconOnBalloonOpen: false
                });

                if (partner.active === false) {
                    // Add placemark to the map
                    placemark.events.add("mouseenter", () => {
                        if (clickedMarker !== placemark && !partner.active) {
                            placemark.options.set("preset", "islands#grayStretchyIcon");
                            placemark.properties.set("iconContent", partner.name);
                        }
                        console.log(partner.active);
                    });

                    placemark.events.add("mouseleave", () => {
                        if (clickedMarker !== placemark && !partner.active) {
                            placemark.options.set("preset", "islands#grayIcon");
                            placemark.properties.set("iconContent", "");
                        }
                    });
                }




                placemark.events.add("click", () => {

                    if (clickedMarker !== placemark) {
                        if (clickedMarker) {
                            const partner = partners.find(p => p.coordinates === clickedMarker.geometry.getCoordinates());
                            partner.active = false;
                            clickedMarker.options.set("preset", "islands#grayIcon");
                            clickedMarker.properties.set("iconContent", clickedMarker.options.get('iconContent'));
                            const previousPartnerData = document.querySelector(`[data-partner-id="${partner.id}"]`);
                            previousPartnerData.classList.remove("open");
                        }

                        clickedMarker = placemark;

                        // Customize the partner's marker based on their active state
                        partner.active = true;
                        placemark.options.set("preset", "islands#redStretchyIcon");
                        console.log(!partner.active)

                        // Handle the dropdown and other DOM elements
                        const partnerData = document.querySelector(`[data-partner-id="${partner.id}"]`);
                        partnerData.classList.add("open");
                    } else {
                        partner.active = false;
                        placemark.options.set("preset", "islands#grayStretchyIcon");
                        placemark.properties.set("iconContent", partner.name);
                        const partnerData = document.querySelector(`[data-partner-id="${partner.id}"]`);

                        partnerData.classList.remove("open");

                        clickedMarker = null;
                    }
                });

                const placemarks = []
                placemarks.push(placemark)
                // Add a click event handler to the dropdown
                handleDrop(show, placemarks, placemark)
                myMapTemp.geoObjects.add(placemark);


            })
            const fpartenrsId = show.map(partner => partner.id);

            originalDrops.forEach(element => {
                mapListContainer.appendChild(element);
            });
            const filtredDropElements = [];
            const commonElements = [];

            allDrops.forEach(element => {
                filtredDropElements.push(element);
            });


            for (const elementId of fpartenrsId) {
                for (const element of filtredDropElements) {
                    const partnerId = element.getAttribute('data-partner-id');
                    if (partnerId === elementId.toString()) {
                        commonElements.push(element);
                    }
                }
            }


            mapListContainer.innerHTML = '';
            commonElements.forEach(element => {
                mapListContainer.appendChild(element);
            });


        }


        showPlacemarks()
    }

    function handleDrop(data, placemarks, placemark) {
        const dropdowns = document.querySelectorAll('.map__list-item');
        let selectedPlacemark = null; // Variable to store the selected placemark

        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener('click', () => {
                const dropId = dropdown.getAttribute("data-partner-id");

                const isOpen = dropdown.classList.contains("open");

                const fdata = data.find(p => p.id == dropId);

                // Deactivate all placemarks before activating the selected one
                placemarks.forEach((pm) => {
                    pm.options.set("preset", "islands#grayIcon");
                    pm.properties.set("iconContent", "");
                });

                // Assuming that placemarkArray is an array of all placemarks
                selectedPlacemark = placemarks.find(placemark => {
                    const placemarkCoordinates = placemark.geometry._coordinates;
                    const fdataCoordinates = fdata.coordinates;
                    return placemarkCoordinates[0] === fdataCoordinates[0] && placemarkCoordinates[1] === fdataCoordinates[1];
                });
                if (isOpen) {
                    fdata.active = true
                }
                if (selectedPlacemark) {
                    if (isOpen) {
                        // You can use the selected placemark (selectedPlacemark) here
                        selectedPlacemark.options.set("preset", "islands#redStretchyIcon");
                        selectedPlacemark.properties.set("iconContent", fdata.name);
                    } else {
                        selectedPlacemark.options.set("preset", "islands#grayIcon");
                        selectedPlacemark.properties.set("iconContent", "");
                    }
                }
                // Close all dropdowns, except the one that was clicked
                dropdowns.forEach((d) => {
                    if (d !== dropdown && d.classList.contains("open")) {
                        d.classList.remove("open");
                    }
                });
            });
        });
    }
}





function getCoordinatesForRegion(region) {
    // Define coordinates for your regions here
    const regionCoordinates = {
        "Все": [55.755863, 37.617700],
        'Алтайский край': [53.346785, 83.776860],
        'Архангельская область': [64.539912, 40.515762],
        'Астраханская область': [46.347616, 48.030175],
        'Московская область': [55.755863, 37.617700],
    };

    if (region == 'all') {

        return regionCoordinates;
    }

    return regionCoordinates[region] || [];
}

function getCitiesForRegion(region) {
    let filteredCities;

    if (region === 'Все') {
        // Включите вариант "Все" в список городов
        const allCities = Array.from(new Set(partners.map(partner => partner.city)));
        allCities.unshift('Все');
        filteredCities = allCities;
    } else {
        filteredCities = partners
            .filter(partner => partner.republic === region)
            .map(partner => partner.city);
        filteredCities.unshift('Все');
    }

    return filteredCities || [];
}

function getRegionsForCities(city) {
    const filteredregions = partners
        .filter(partner => partner.city === city)
        .map(partner => partner.republic);

    if (city === 'Все') {
        // Включите вариант "Все" в список городов
        const allRegions = Array.from(new Set(partners.map(partner => partner.republic)));
        // allRegions.unshift('Все');
        return allRegions;
    }

    return filteredregions || [];
}

function getCoordinatesForCity(city) {
    var cityCoordinates = {
        "Все": [55.679214, 37.605921],
        "Астрахань": [46.347614, 48.030178],
        "Архангельск": [64.539911, 40.515762],
        "Барнаул": [53.346785, 83.776856],
        "Москва": [55.755864, 37.617698],

    };

    return cityCoordinates[city] || [];
}
