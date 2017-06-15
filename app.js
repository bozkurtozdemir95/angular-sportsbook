var liveBet = angular.module("liveBet",['pascalprecht.translate']);
  
  var translationsEN = {
    lang: 'English',
    key: 'gb',
    SPORTS: 'Sports Betting',
    LIVE: 'Live Betting',
    CASINO:'Casino',
    MATCHID:'Match Id',
    DATE:'Date',
    TEAMS:'Teams',
    UNDER:'Under 2.5',
    OVER:'Over 2.5',
    TICKET:'Coupon',
    BET:'Bet',
    BETNO:'Number of Bets',
    MAXODD:'Max. Odd',
    MAXWINNING:'Max. Winning',
};
  var translationsTR = {
    lang: 'Türkçe',
    key: 'tr',
    SPORTS: 'Spor Bahisleri',
    LIVE: 'Canlı Bahis',
    CASINO:'Casino',
    MATCHID:'Maç Kodu',
    DATE:'Tarih',
    TEAMS:'Takımlar',
    UNDER:'2.5 Alt',
    OVER:'2.5 Üst',
    TICKET:'Kupon',
    BET:'Bahis Miktarı',
    BETNO:'Maç sayısı',
    MAXODD:'Maks. Oran',
    MAXWINNING:'Maks. Kazanç',
};

  var translationsDE = {
    lang: 'Deutsch',
    key: 'de',
    SPORTS: 'Sportwetten',
    LIVE: 'Live-Wetten',
    CASINO:'Kasino',
    MATCHID:'Spiel-Id',
    DATE:'Datum',
    TEAMS:'Teams',
    UNDER:'Unter 2.5',
    OVER:'Über 2.5',
    TICKET:'Gutschein',
    BET:'Wette',
    BETNO:'Anzahl der Wetten',
    MAXODD:'Max Ungerade',
    MAXWINNING:'Höchstgewinn',
};
  var translationsRU = {
    lang: 'Pусский',
    key: 'ru',
    SPORTS: 'Ставки на спорт',
    LIVE: 'Живая ставка',
    CASINO:'казино',
    MATCHID:'Идентификатор ',
    DATE:'Дата',
    TEAMS:'команды',
    UNDER:'Менее 2.5',
    OVER:'Более 2.5',
    TICKET:'купон',
    BET:'ставка',
    BETNO:'делать ставку',
    MAXODD:'Максимум нечетный',
    MAXWINNING:'Максимальный выигрыш',
};
   

liveBet.config(['$translateProvider', function($translateProvider) {
   
   $translateProvider
      .translations('en', translationsEN)
      .translations('tr', translationsTR)
      .translations('de', translationsDE)
      .translations('ru', translationsRU)
      .preferredLanguage('tr');
        $translateProvider.useSanitizeValueStrategy('escape');
}]);

 

liveBet.controller("liveBetCtrl",['$translate', '$scope',
	function($translate, $scope){

      $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
      };



		$scope.match = Matches;
        $scope.couponIds = [];
        $scope.coupon = {bet: 1, odds:[]};
        $scope.maxodd = function(){
          if(!$scope.coupon.odds.length){
            return 0;
          }

          if($scope.coupon.odds.length === 1){
            return $scope.coupon.odds[0].odd;
          }

          return $scope.coupon.odds.reduce(function(a,b){
            return parseFloat(((a.odd ? a.odd : a) * b.odd).toFixed(2));
          })
        }
        $scope.maxwin = function(){
          return ($scope.coupon.bet * $scope.maxodd()).toFixed(2) || 0;
        }

		$scope.addMatch = function(odd, match){
          var betId = match.matchId + '' + odd.id;
          var betIndex = $scope.couponIds.indexOf(betId);
            if(betIndex !== -1){
              $scope.coupon.odds.splice(betIndex, 1);
              $scope.couponIds.splice(betIndex, 1);
              return false;
            }
          
            var newOdd = {
              away: match.awayTeam,
              home: match.homeTeam,
              name: odd.name,
              odd: odd.odd
            }
           


            $scope.couponIds.push(betId);
			      $scope.coupon.odds.push(newOdd)
            $scope.maxwin();
		}
        
        $scope.isActive = function(odd, item){
          var betId = item.matchId + '' + odd.id;
          return $scope.couponIds.indexOf(betId) !== -1;
        }
	}]);

  	var Matches = {
  		items : [
  			{ 
  				  matchId: "520", 
  			  	matchDate: "17/05 20:00", 
  			  	homeTeam: "Tom Tomsk", 
  			  	awayTeam: "Kryliya Sovetov",
                markets: [
                  {
                    name: '1x2',
                    id: 30,
                    odds: [
                      {id: 31, name: '1', odd: 1.3},
                      {id: 32, name: 'x', odd: 2},
                      {id: 33, name: '2', odd: 4}
                    ]
                  },
                  {
                    name: 'Over/Under',
                    id: 34,
                    odds: [
                      {id: 35, name: 'Under 2.5', odd: 1.3},
                      {id: 36, name: 'Over 2.5', odd: 4}
                    ]
                  },
              {
                    name: 'Home or Away',
                    id: 37,
                    odds: [
                      {id: 38, name: '1/X', odd: 1.3},
                      {id: 39, name: '1/2', odd: 1.3},
                      {id: 40, name: '2/X', odd: 4}
                    ]
                } 
		  ]
		},
    { 
  				  matchId: "521", 
  			  	matchDate: "18/05 20:30", 
  			  	homeTeam: "Beşiktaş JK", 
  			  	awayTeam: "Trabzonspor",
                markets: [
                  {
                    name: '1x2',
                    id: 30,
                    odds: [
                      {id: 31, name: '1', odd: 2.30},
                      {id: 32, name: 'x', odd: 3.50},
                      {id: 33, name: '2', odd: 4.60}
                    ]
                  },
                  {
                    name: 'Over/Under',
                    id: 34,
                    odds: [
                      {id: 35, name: 'Under 2.5', odd: 1.65},
                      {id: 36, name: 'Over 2.5', odd: 1.80}
                    ]
                  },
              {
                    name: 'Home or Away',
                    id: 37,
                    odds: [
                      {id: 38, name: '1/X', odd: 1.45},
                      {id: 39, name: '1/2', odd: 1.10},
                      {id: 40, name: '2/X', odd: 1.70}
                    ]
                } 
		  ]
		},
          { 
  				matchId: "522", 
  			  	matchDate: "17/05 20:00", 
  			  	homeTeam: "Fenerbahçe", 
  			  	awayTeam: "Galatasaray",
                markets: [
                  {
                    name: '1x2',
                    id: 30,
                    odds: [
                      {id: 31, name: '1', odd: 1.6},
                      {id: 32, name: 'x', odd: 2.10},
                      {id: 33, name: '2', odd: 4.1}
                    ]
                  },
                  {
                    name: 'Over/Under',
                    id: 34,
                    odds: [
                      {id: 35, name: 'Under 2.5', odd: 1.8},
                      {id: 36, name: 'Over 2.5', odd: 2.5}
                    ]
                  },
              {
                    name: 'Home or Away',
                    id: 37,
                    odds: [
                      {id: 38, name: '1/X', odd: 1.6},
                      {id: 39, name: '1/2', odd: 1.8},
                      {id: 40, name: '2/X', odd: 2}
                    ]
                } 
		  ]
		},
    { 
  				matchId: "523", 
  			  	matchDate: "17/05 20:00", 
  			  	homeTeam: "Real Madrid", 
  			  	awayTeam: "Barcelona",
                markets: [
                  {
                    name: '1x2',
                    id: 30,
                    odds: [
                      {id: 31, name: '1', odd: 1.5},
                      {id: 32, name: 'x', odd: 2.30},
                      {id: 33, name: '2', odd: 3.10}
                    ]
                  },
                  {
                    name: 'Over/Under',
                    id: 34,
                    odds: [
                      {id: 35, name: 'Under 2.5', odd: 2.20},
                      {id: 36, name: 'Over 2.5', odd: 1.45}
                    ]
                  },
              {
                    name: 'Home or Away',
                    id: 37,
                    odds: [
                      {id: 38, name: '1/X', odd: 1.20},
                      {id: 39, name: '1/2', odd: 1.60},
                      {id: 40, name: '2/X', odd: 1.40}
                    ]
                } 
		  ]
		}
  		]
  	}
