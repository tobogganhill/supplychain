App = {
	web3Provider: null,
	contracts: {},
	emptyAddress: '0x0000000000000000000000000000000000000000',
	sku: 0,
	upc: 0,
	metamaskAccountID: '0x0000000000000000000000000000000000000000',
	ownerID: '0x0000000000000000000000000000000000000000',
	originFarmerID: '0x0000000000000000000000000000000000000000',
	originFarmName: null,
	originFarmInformation: null,
	originFarmLatitude: null,
	originFarmLongitude: null,
	productNotes: null,
	productPrice: 0,
	distributorID: '0x0000000000000000000000000000000000000000',
	retailerID: '0x0000000000000000000000000000000000000000',
	consumerID: '0x0000000000000000000000000000000000000000',
	itemOne: [],
	itemTwo: [],

	init: async function () {
		App.readForm();
		/// Setup access to blockchain
		return await App.initWeb3();
	},

	readForm: function () {
		App.sku = $('#sku').val();
		App.upc = $('#upc').val();
		App.ownerID = $('#ownerID').val();
		App.originFarmerID = $('#originFarmerID').val();
		App.originFarmName = $('#originFarmName').val();
		App.originFarmInformation = $('#originFarmInformation').val();
		App.originFarmLatitude = $('#originFarmLatitude').val();
		App.originFarmLongitude = $('#originFarmLongitude').val();
		App.productNotes = $('#productNotes').val();
		App.productPrice = $('#productPrice').val();
		App.distributorID = $('#distributorID').val();
		App.retailerID = $('#retailerID').val();
		App.consumerID = $('#consumerID').val();

		console.log(
			App.sku,
			App.upc,
			App.ownerID,
			App.originFarmerID,
			App.originFarmName,
			App.originFarmInformation,
			App.originFarmLatitude,
			App.originFarmLongitude,
			App.productNotes,
			App.productPrice,
			App.distributorID,
			App.retailerID,
			App.consumerID
		);
	},

	initWeb3: async function () {
		/// Find or Inject Web3 Provider
		/// Modern dapp browsers...
		if (window.ethereum) {
			App.web3Provider = window.ethereum;
			try {
				// Request account access
				await window.ethereum.enable();
			} catch (error) {
				// User denied account access...
				console.error('User denied account access');
			}
		}
		// Legacy dapp browsers...
		else if (window.web3) {
			App.web3Provider = window.web3.currentProvider;
		}
		// If no injected web3 instance is detected, fall back to Ganache
		else {
			App.web3Provider = new Web3.providers.HttpProvider(
				'http://localhost:7545'
			);
		}

		App.getMetaskAccountID();

		return App.initSupplyChain();
	},

	getMetaskAccountID: function () {
		web3 = new Web3(App.web3Provider);

		// Retrieving accounts
		web3.eth.getAccounts(function (err, res) {
			if (err) {
				console.log('Error:', err);
				return;
			}
			console.log('getMetaskID:', res);
			App.metamaskAccountID = res[0];
		});
	},

	initSupplyChain: function () {
		/// Source the truffle compiled smart contracts
		var jsonSupplyChain = '../../build/contracts/SupplyChain.json';

		/// JSONfy the smart contracts
		$.getJSON(jsonSupplyChain, function (data) {
			console.log('data', data);
			var SupplyChainArtifact = data;
			App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
			App.contracts.SupplyChain.setProvider(App.web3Provider);

			App.fetchItemBufferOne();
			App.fetchItemBufferTwo();
			App.fetchEvents();
		});

		return App.bindEvents();
	},

	bindEvents: function () {
		$(document).on('click', App.handleButtonClick);
	},

	handleButtonClick: async function (event) {
		event.preventDefault();

		App.getMetaskAccountID();

		var processId = parseInt($(event.target).data('id'));
		console.log('processId', processId);

		switch (processId) {
			case 1:
				return await App.harvestItem(event);
				break;
			case 2:
				return await App.processItem(event);
				break;
			case 3:
				return await App.packItem(event);
				break;
			case 4:
				return await App.sellItem(event);
				break;
			case 5:
				return await App.buyItem(event);
				break;
			case 6:
				return await App.shipItem(event);
				break;
			case 7:
				return await App.receiveItem(event);
				break;
			case 8:
				return await App.purchaseItem(event);
				break;
			case 9:
				return await App.fetchItemBufferOne(event);
				break;
			case 10:
				return await App.fetchItemBufferTwo(event);
				break;
			case 11:
				return await App.addDistributor(event);
				break;
			case 12:
				return await App.addRetailer(event);
				break;
			case 13:
				return await App.addConsumer(event);
				break;
		}
	},

	harvestItem: function (event) {
		event.preventDefault();
		var processId = parseInt($(event.target).data('id'));

		// Get form current value
		App.readForm();

		App.contracts.SupplyChain.deployed()
			.then(function (instance) {
				return instance.harvestItem(
					App.upc,
					App.metamaskAccountID,
					App.originFarmName,
					App.originFarmInformation,
					App.originFarmLatitude,
					App.originFarmLongitude,
					App.productNotes
				);
			})
			.then(function (result) {
				//$("#ftc-item").text(result);
				App.updateOwner(App.metamaskAccountID);
				App.updateFarmer(App.metamaskAccountID);
				$('#ftc-history').append('<li>' + JSON.stringify(result) + '</li>');
				console.log('harvestItem', result);
			})
			.catch(function (err) {
				console.log(err.message);
			});
	},

	processItem: function (event) {
		event.preventDefault();
		var processId = parseInt($(event.target).data('id'));

		// Get upc current value
		App.upc = $('#upc').val();

		App.contracts.SupplyChain.deployed()
			.then(function (instance) {
				return instance.processItem(App.upc, { from: App.metamaskAccountID });
			})
			.then(function (result) {
				//$("#ftc-item").text(result);
				$('#ftc-history').append('<li>' + JSON.stringify(result) + '</li>');
				console.log('processItem', result);
			})
			.catch(function (err) {
				console.log(err.message);
			});
	},

	packItem: function (event) {
		event.preventDefault();
		var processId = parseInt($(event.target).data('id'));

		// Get upc current value
		App.upc = $('#upc').val();

		App.contracts.SupplyChain.deployed()
			.then(function (instance) {
				return instance.packItem(App.upc, { from: App.metamaskAccountID });
			})
			.then(function (result) {
				//$("#ftc-item").text(result);
				$('#ftc-history').append('<li>' + JSON.stringify(result) + '</li>');
				console.log('packItem', result);
			})
			.catch(function (err) {
				console.log(err.message);
			});
	},

	sellItem: function (event) {
		event.preventDefault();
		var processId = parseInt($(event.target).data('id'));

		// Get upc current value
		App.upc = $('#upc').val();

		App.contracts.SupplyChain.deployed()
			.then(function (instance) {
				const productPrice = web3.toWei(App.productPrice, 'ether');
				console.log('productPrice', productPrice);
				return instance.sellItem(App.upc, productPrice, {
					from: App.metamaskAccountID,
				});
			})
			.then(function (result) {
				//$("#ftc-item").text(result);
				$('#ftc-history').append('<li>' + JSON.stringify(result) + '</li>');
				console.log('sellItem', result);
			})
			.catch(function (err) {
				console.log(err.message);
			});
	},

	buyItem: function (event) {
		event.preventDefault();
		var processId = parseInt($(event.target).data('id'));

		// Get upc current value
		App.upc = $('#upc').val();

		App.contracts.SupplyChain.deployed()
			.then(function (instance) {
				const walletValue = web3.toWei(3, 'ether');
				return instance.buyItem(App.upc, {
					from: App.metamaskAccountID,
					value: walletValue,
				});
			})
			.then(function (result) {
				//$("#ftc-item").text(result);
				App.updateOwner(App.metamaskAccountID);
				App.updateDistributor(App.metamaskAccountID);
				$('#ftc-history').append('<li>' + JSON.stringify(result) + '</li>');
				console.log('buyItem', result);
			})
			.catch(function (err) {
				console.log(err.message);
			});
	},

	shipItem: function (event) {
		event.preventDefault();
		var processId = parseInt($(event.target).data('id'));

		// Get upc current value
		App.upc = $('#upc').val();

		App.contracts.SupplyChain.deployed()
			.then(function (instance) {
				return instance.shipItem(App.upc, { from: App.metamaskAccountID });
			})
			.then(function (result) {
				//$("#ftc-item").text(result);
				$('#ftc-history').append('<li>' + JSON.stringify(result) + '</li>');
				console.log('shipItem', result);
			})
			.catch(function (err) {
				console.log(err.message);
			});
	},

	receiveItem: function (event) {
		event.preventDefault();
		var processId = parseInt($(event.target).data('id'));

		// Get upc current value
		App.upc = $('#upc').val();

		App.contracts.SupplyChain.deployed()
			.then(function (instance) {
				return instance.receiveItem(App.upc, { from: App.metamaskAccountID });
			})
			.then(function (result) {
				//$("#ftc-item").text(result);
				App.updateOwner(App.metamaskAccountID);
				App.updateRetailer(App.metamaskAccountID);
				$('#ftc-history').append('<li>' + JSON.stringify(result) + '</li>');
				console.log('receiveItem', result);
			})
			.catch(function (err) {
				console.log(err.message);
			});
	},

	purchaseItem: function (event) {
		event.preventDefault();
		var processId = parseInt($(event.target).data('id'));

		// Get upc current value
		App.upc = $('#upc').val();

		App.contracts.SupplyChain.deployed()
			.then(function (instance) {
				return instance.purchaseItem(App.upc, { from: App.metamaskAccountID });
			})
			.then(function (result) {
				//$("#ftc-item").text(result);
				App.updateOwner(App.metamaskAccountID);
				App.updateConsumer(App.metamaskAccountID);
				$('#ftc-history').append('<li>' + JSON.stringify(result) + '</li>');
				console.log('purchaseItem', result);
			})
			.catch(function (err) {
				console.log(err.message);
			});
	},

	updateOwner: function (_ownerID) {
		$('#ownerID').val(_ownerID);
	},

	updateFarmer: function (_farmerID) {
		$('#originFarmerID').val(_farmerID);
	},

	updateDistributor: function (_distributorID) {
		$('#distributorID').val(_distributorID);
	},

	updateRetailer: function (_retailerID) {
		$('#retailerID').val(_retailerID);
	},

	updateConsumer: function (_consumerID) {
		$('#consumerID').val(_consumerID);
	},

	fetchItemBufferOne: function () {
		///   event.preventDefault();
		///    var processId = parseInt($(event.target).data('id'));

		// reset modal view
		$('#table-body').html('fetching data...');
		$('#exampleModalLabel').html('fetching data...');

		App.upc = $('#upc').val();
		console.log('upc', App.upc);

		App.contracts.SupplyChain.deployed()
			.then(function (instance) {
				return instance.fetchItemBufferOne(App.upc);
			})
			.then(function (result) {
				$('#ftc-item').text(result);
				App.itemOne = [JSON.parse(JSON.stringify(result))];
				App.fetchItemBufferTwo();
			})
			.catch(function (err) {
				console.log(err.message);
			});
	},

	fetchItemBufferTwo: function () {
		///    event.preventDefault();
		///    var processId = parseInt($(event.target).data('id'));

		App.contracts.SupplyChain.deployed()
			.then(function (instance) {
				return instance.fetchItemBufferTwo(App.upc);
			})
			.then(function (result) {
				$('#ftc-item').text(result);
				console.log('fetchItemBufferTwo', JSON.stringify(result));
				App.itemTwo = [JSON.parse(JSON.stringify(result))];
				App.displayItem();
			})
			.catch(function (err) {
				console.log(err.message);
			});
	},

	fetchEvents: function () {
		if (
			typeof App.contracts.SupplyChain.currentProvider.sendAsync !== 'function'
		) {
			App.contracts.SupplyChain.currentProvider.sendAsync = function () {
				return App.contracts.SupplyChain.currentProvider.send.apply(
					App.contracts.SupplyChain.currentProvider,
					arguments
				);
			};
		}

		App.contracts.SupplyChain.deployed()
			.then(function (instance) {
				var events = instance.allEvents(function (err, log) {
					if (!err)
						$('#ftc-events').append(
							'<li>' + log.event + ' - ' + log.transactionHash + '</li>'
						);
					$('html,body').scrollTop(0);
					$('#toast-title').text(log.event);
					$('#toast-msg').text(log.transactionHash);
					$('.toast').toast('show');
				});
			})
			.catch(function (err) {
				console.log(err.message);
			});
	},

	displayItem: async function () {
		item = [...App.itemOne, ...App.itemTwo];
		var state = App.getState(item[1][5]);
		var price = web3.fromWei(item[1][4]);
		var title =
			'<b>' +
			state +
			' - ' +
			item[1][3] +
			'</b></br><small>[ Price: ' +
			price +
			' ETH ]  [ sku: ' +
			item[0][0] +
			' ]  [ upc: ' +
			item[0][1] +
			' ] [ productId: ' +
			item[1][2] +
			' ]';
		$('#exampleModalLabel').html(title);
		// Get owner of upc current value
		$('#ownerID').val(item[0][2]);
		console.log(item);
		$('#table-body').html(
			// '<li>SKU: ' + item[0][0] + '</li>' +
			// '<li>UPC: ' + item[0][1] + '</li>' +
			// '<li>itemState: ' + state + '</li>' +
			'<li><b>ownerID</b>: ' +
				item[0][2] +
				'</li>' +
				'<li><b>farmerID</b>: ' +
				item[0][3] +
				'</li>' +
				'<li><b>distributorID</b>: ' +
				item[1][6] +
				'</li>' +
				'<li><b>retailerID:</b> ' +
				item[1][7] +
				'</li>' +
				'<li><b>consumerID:</b> ' +
				item[1][8] +
				'</li>' +
				// '<li>ProductID: ' + item[1][2] + '</li>' +
				'<li><b>originFarmName:</b> ' +
				item[0][4] +
				'</li>' +
				'<li><b>originFarmInformation:</b> ' +
				item[0][5] +
				'</li>' +
				'<li><b>originFarmLatitude:</b> ' +
				item[0][6] +
				'</li>' +
				'<li><b>originFarmLongitude:</b> ' +
				item[0][7] +
				'</li>'
			// '<li>productNotes: ' + item[1][3] + '</li>' +
			// '<li>productPrice: ' + item[1][4] + '</li>'
		);
		//$('#exampleModal').modal('show');
	},

	getState: function (state) {
		var number = parseInt(state);
		switch (number) {
			case 0:
				return 'Harvested';
				break;
			case 1:
				return 'Processed';
				break;
			case 2:
				return 'Packed';
				break;
			case 3:
				return 'ForSale';
				break;
			case 4:
				return 'Sold';
				break;
			case 5:
				return 'Shipped';
				break;
			case 6:
				return 'Received';
				break;
			case 7:
				return 'Purchased';
				break;
		}
	},

	sleep: function (ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	},
};

$(function () {
	$(window).load(function () {
		App.init();
	});
	// $("#close-toast").click(function(){
	//     $('.toast').toast('hide');
	// });
	$('.toast').on('hidden.bs.toast'),
		(e) => {
			$(e.currentTarget).remove();
		};
});
