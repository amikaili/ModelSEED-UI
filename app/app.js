

angular.module('ModelSEED',
['config',
 'core-directives',
 'ctrls',
 'ms-ctrls',
 'help-ctrls',
 'DataViewCtrls',
 'duScroll',
 'ui.router',
 'ngAnimate',
 'ms-rpc',
 'Auth',
 'dd-filter',
 'mega-dropdown',
 'ng-context-menu',
 'ngMaterial',
 'FBA',
 'ModelViewer',
 'Patric',
 'WS',
 'MS',
 'Upload',
 'Biochem',
 'Browser',
 'Regulons',
 'Dialogs',
 'docs-directives'
 ])
.config(['$locationProvider', '$stateProvider', '$httpProvider',
         '$urlRouterProvider', '$urlMatcherFactoryProvider', '$sceProvider',
function($locationProvider, $stateProvider, $httpProvider,
         $urlRouterProvider, $urlMatcherFactoryProvider, $sceProvider) {

    $locationProvider.html5Mode(true);
    $sceProvider.enabled(false);
    $urlMatcherFactoryProvider.strictMode(false);

    function valToString(val) {
        return val !== null ? decodeURI(val) : val;
    }

    $urlMatcherFactoryProvider.type('nonURIEncoded', {
        encode: valToString,
        decode: valToString,
        is: function () { return true; }
    });

    $stateProvider
        .state('home', {
            url: "/home/?login&redirect",
            templateUrl: 'app/views/home.html',
            controller: 'Home',
        })

        .state('main', {
            templateUrl: 'app/views/main.html',
        }).state('main.team', {
            url: "/henry-lab",
            templateUrl: 'app/views/docs/team.html',
        }).state('main.publications', {
            url: "/publications",
            templateUrl: 'app/views/docs/publications.html',
        })

        // ModelSEED Projects
        .state('main.projects', {
            url: '/projects',
            templateUrl: '/ms-projects/home.html',
        }).state('main.projects.regulons', {
            url: '/regulons',
            templateUrl: '/ms-projects/regulons/overview.html',
        }).state('main.projects.regulons.genes', {
            url: '/genes?q',
            templateUrl: '/ms-projects/regulons/genes.html',
            controller: 'Regulons'
        }).state('main.projects.regulons.regulators', {
            url: '/regulators?q',
            templateUrl: '/ms-projects/regulons/regulators.html',
            controller: 'Regulons'
        })


        .state('main.about', {
            url: '/about',
            templateUrl: 'app/views/about.html',
        })
        .state('main.about.version', {
            url: "/about/version",
            templateUrl: 'app/views/version.html',
            controller: 'Version'
        }).state('main.about.faq', {
            url: "/about/faq",
            templateUrl: 'app/views/docs/faq.html',
        })



        // main application template
        .state('app', {
            templateUrl: 'app/views/app.html',
        })

        // data browser
        .state('app.myData', {
            url: "/data{dir:nonURIEncoded}",
            templateUrl: 'app/components/browser/browser.html',
            controller: 'MyData',
            authenticate: true
        }).state('app.modelPage', {
            url: "/model{path:nonURIEncoded}?login",
            templateUrl: 'app/views/data/model.html',
            controller: 'ModelDataView',
            authenticate: true
        }).state('app.fbaPage', {
            url: "/fba{path:nonURIEncoded}",
            templateUrl: 'app/views/data/fba.html',
            controller: 'FBADataView',
            authenticate: true
        }).state('app.genomePage', {
            url: "/genome{path:nonURIEncoded}",
            templateUrl: 'app/views/data/genome.html',
            controller: 'GenomeDataView',
            authenticate: true
        }).state('app.featurePage', {
            url: "/feature{genome:nonURIEncoded}/{feature:nonURIEncoded}",
            templateUrl: 'app/views/data/feature.html',
            controller: 'FeatureDataView',
            authenticate: true
        }).state('app.mediaPage', {
            url: "/media{path:nonURIEncoded}",
            templateUrl: 'app/views/data/media.html',
            controller: 'MediaDataView',
            authenticate: true
        }).state('app.gfPage', {
            url: "/gapfill{path:nonURIEncoded}",
            templateUrl: 'app/views/data/gapfill.html',
            controller: 'GapfillDataView',
            authenticate: true
        })

        // The good stuff
        .state('app.biochem', {
            url: "/biochem/?tab",
            templateUrl: 'app/views/biochem/biochem.html',
            controller: 'Biochem',
            authenticate: true,
            //reloadOnSearch: false
        }).state('app.biochemViewer', {
            url: "/biochem-viewer/?cpd?tab",
            templateUrl: 'app/views/biochem/biochem-viewer.html',
            controller: 'BiochemViewer',
            authenticate: true
        }).state('app.plantAnnotations', {
            url: "/plant-annotations/",
            templateUrl: 'app/views/annotations.html',
            controller: 'PlantAnnotations',
            authenticate: true
        }).state('app.reconstruct', {
            url: "/reconstruct/",
            templateUrl: 'app/views/reconstruct.html',
            controller: 'Reconstruct',
            authenticate: true
        }).state('app.media', {
            url: "/list-media/?tab",
            templateUrl: 'app/views/media.html',
            controller: 'Media',
            authenticate: true
        }).state('app.myModels', {
            url: "/my-models/",
            templateUrl: 'app/views/my-models.html',
            controller: 'MyModels',
            authenticate: true
        })

        // Object Editors
        .state('app.modelEditor', {
            url: "/model-editor/",
            templateUrl: 'app/views/editor/model-editor.html',
            controller: 'ModelEditor',
            authenticate: true
        })/*.state('app.media', {
            url: "/media-editor/",
            templateUrl: 'app/views/editor/media-editor.html',
            controller: 'MediaEditor',
            authenticate: true
        })*/

        // comparative analysis
        .state('app.compare', {
            url: "/compare",
            templateUrl: 'app/views/compare.html',
            controller: 'Compare',
            authenticate: true
        })

        .state('app.api', {
            url: "/help/api",
            templateUrl: 'app/views/docs/api.html',
            controller: 'Help',
        })

        // prototype page
        .state('app.proto', {
            url: "/proto",
            templateUrl: 'app/views/proto.html',
            controller: 'Proto',
        }).state('app.maps', {
            url: "/maps",
            templateUrl: 'app/views/maps.html',
            controller: 'Maps',
        }).state('app.map', {
            url: "/maps{path:nonURIEncoded}",
            templateUrl: 'app/views/data/map.html',
            controller: 'Map',
        }).state('app.json', {
            url: "/json{path:nonURIEncoded}",
            templateUrl: 'app/views/data/json.html',
            controller: 'Json',
        }).state('app.image', {
            url: "/image{path:nonURIEncoded}",
            templateUrl: 'app/views/data/image.html',
            controller: 'Image',
        })



        /* only used for testing analysis forms */
        .state('app.run', {
            url: "/run",
            templateUrl: 'app/views/run/run.html',
        }).state('app.runReconstruct', {
            url: "/run/reconstruct",
            templateUrl: 'app/views/apps/reconstruct.html',
            controller: 'RunReconstruct',
        }).state('app.runFBA', {
            url: "/run/fba",
            templateUrl: 'app/views/apps/runFBA.html',
            controller: 'RunFBA',
        }).state('app.runGapfill', {
            url: "/run/gapfill",
            templateUrl: 'app/views/apps/gapfill.html',
            controller: 'RunGapfill',
        })

    // default redirects (when not already authenticated)
    $urlRouterProvider.when('', '/home/')
                      .when('/', '/home/')
                      .when('#', '/home/');

}])

.config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('cyan')
        .accentPalette('light-blue');
        //rgb(38, 198, 218);
        //.accentPalette('light-blue');
}])

.service('AuthDialog', ['MS', 'WS', '$mdDialog', '$mdToast', 'uiTools', '$timeout',
function(MS, WS, $dialog, $mdToast, uiTools, $timeout) {

    this.signIn = function(title, msg) {
        return $dialog.show({
            templateUrl: 'app/views/dialogs/auth.html',
            clickOutsideToClose: false,
            controller: ['$scope', '$http',
            function($s, $http) {
                $s.title = title;
                $s.msg = msg;

                $s.ok = function(){
                    $dialog.hide();
                }

                $s.cancel = function(){
                    $dialog.hide();
                }
            }]
        })
    }

}])

.run(['$rootScope', '$state', '$stateParams', '$window',
      '$location', 'Auth', '$timeout', '$templateCache', 'config', 'AuthDialog',
function($rootScope, $state, $sParams, $window,
         $location, auth, $timeout, $templateCache, config, AuthDialog) {

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        //$templateCache.removeAll();

        // if first load on home and user is authenticated,
        // forward to application page [good UX!]
        if (fromState.name === '' && toState.name === "home" && auth.isAuthenticated()) {
            // wait for state set
            $timeout(function() {
                $state.transitionTo('app.reconstruct')
                event.preventDefault();
            })
        }

        // else, if not authenticated and url is private, go to home
        else if (toState.authenticate && !auth.isAuthenticated()) {
            //$state.transitionTo('home', $sParams, false);
            //event.preventDefault();
            console.log('NEED TO AUTH')
            AuthDialog.signIn();
        }

        // google analytics
        $window.ga('send', 'pageview', $location.path());
    })

    $rootScope.$state = $state;
    $rootScope.$stateParams = $sParams;

    $rootScope.user = auth.user;
    $rootScope.token = auth.token;

    console.log('include plants?', config.includePlants)
    $rootScope.includePlants = config.includePlants;
}]);
