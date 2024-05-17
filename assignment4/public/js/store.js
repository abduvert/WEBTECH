function store() {
    $(document).on("click", ".btn-search", function() {
        console.log("HELLOO");
        window.location.href = "/store";
    });
}

var currentPage = 1;

// Displaying stores with pagination
function displayStores(page) {
    $.ajax({
        url: `http://localhost:3000/api/stores?page=${page}`,
        method: "GET",
        dataType: "json",
        success: function(data) {
            var storesContainer = $(".store-container");
            storesContainer.empty();

            $.each(data.stores, function(_, store) {
                storesContainer.append(
                    `<div class="store">
                        <img class="storeImg" src="/assets/stores/almas.png" alt="almasStore">
                        <h3 class="storeName">${store.name}</h3>
                        <p class="storeDescription">${store.description}</p>
                        <button class="btn my-2 my-sm-0 btn-search" type="button">Visit</button>
                    </div>`
                );
            });

            currentPage = page;
            $("#pageInfo").text(`Page ${currentPage} of ${data.totalPages}`);

            // Enable/disable buttons based on the current page
            $("#prevPage").prop("disabled", currentPage === 1);
            $("#nextPage").prop("disabled", currentPage === data.totalPages);
        },
        error: function(error) {
            console.error("Error fetching stores:", error);
        }
    });
}

// Displaying products
function displayProducts() {
    $.ajax({
        url: "http://localhost:5000/products",
        method: "GET",
        dataType: "json",
        success: function(data) {
            var productsContainer = $(".items");
            productsContainer.empty();

            $.each(data, function(_, product) {
                productsContainer.append(
                    `<div class="cardS">
                        <img class="card-img" src="/assets/ipod.jpg" alt="${product.product}">
                        <div class="card-info">
                            <p class="text-title">${product.product}</p>
                            <p class="text">${product.description}</p>
                            <div class="color-info">
                                <div class="color-circle" style="background-color: ${product.color};"></div>
                                <span class="color-name">${product.color}</span>
                            </div>
                        </div>
                        <div class="card-foot">
                            <span class="text-title">$${product.price}</span>
                            <div class="card-button">
                                <svg class="svg-icon" viewBox="0 0 20 20">
                                    <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                                    <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                                    <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>`
                );
            });
        },
        error: function(error) {
            console.error("Error fetching products:", error);
        }
    });
}

function deleteProduct(productId) {
    $.ajax({
        url: "http://localhost:5000/products/" + productId,
        method: "DELETE",
        success: function() {
            displayProducts();
        },
        error: function(error) {
            console.error("Error deleting product:", error);
        }
    });
}

function handleFormSubmission(event) {
    event.preventDefault();

    let productId = $(".create").attr("data-id");
    var product = {
        product: $(".text-title").val(),
        description: $(".text").val(),
        // Add other properties as needed
    };

    if (productId) {
        $.ajax({
            url: "http://localhost:5000/products/" + productId,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(product),
            success: function() {
                displayProducts();
            },
            error: function(error) {
                console.error("Error updating product:", error);
            }
        });
    } else {
        $.ajax({
            url: "http://localhost:5000/products",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(product),
            success: function() {
                displayProducts();
            },
            error: function(error) {
                console.error("Error creating product:", error);
            }
        });
    }
}

function editBtnClicked(event) {
    event.preventDefault();

    let productId = $(this).attr("data-id");
    $.ajax({
        url: "http://localhost:5000/products/" + productId,
        method: "GET",
        success: function(product) {
            $(".clear").show();
            $(".text-title").val(product.product);
            $(".text").val(product.description);
            // Set other fields if needed
            $(".create").html("Update");
            $(".create").attr("data-id", product.id);
        },
        error: function(error) {
            console.error("Error fetching product:", error);
        }
    });
}

$(document).ready(function() {
    store();
    
    displayStores(currentPage);

    $("#prevPage").on("click",function() {
        if (currentPage > 1) {
            displayStores(currentPage - 1);
        }
    });

    $("#nextPage").on("click",function() {
        console.log("fbkhkd")
        displayStores(currentPage + 1);
    });

    displayProducts();

    $(document).on("click", ".delete", function() {
        deleteProduct($(this).attr("data-id"));
    });
    
    $(document).on("click", ".edit", editBtnClicked);

    $(".form").submit(handleFormSubmission);
    
    $(".clear").on("click", function(e) {
        e.preventDefault();
        $(".clear").hide();
        $(".create").removeAttr("data-id");
        $(".create").html("Create");
        $(".text-title").val("");
        $(".text").val("");
        // Clear other fields if needed
    });
});
