var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');

var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

var MAILBOX = {
    inbox: {
        0: {
            id: 0,
            from: "billg@microsoft.com",
            to: "TeamWoz@Woz.org",
            title: "Possible work opportunity",
            content: "Dear Woz.  Fancy a job at Mister Softee?  Bill x"
        },
        1: {
            id: 1,
            from: "zuck@facebook.com",
            to: "TeamWoz@Woz.org",
            title: "Do you know PHP?",
            content: "Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x"
        }
    },
    spam: {
        0: {
            id: 0,
            from: "ChEaPFl1ghTZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "WaNt CHEEp FlitZ",
            content: "Theyre CheEp"
        },
        1: {
            id: 1,
            from: "NiKEAIRJordanZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "JorDanz For SAle",
            content: "Theyre REELY CheEp"
        }
    }
}

var Navbar = function() {
    return (
        <nav id="sidebar">
            <p><Link to={'/inbox'}>Inbox</Link></p>
            <p><Link to={'/spam'}>Spam</Link></p>
        </nav>
    );
};

// Each mail
var EachMail = function(props) {
console.log('Im here');
    return (
        <div id="message-view">
            <p>From: {props.from}</p>
            <p>To: {props.to}</p>
            <p>Subject: {props.title}</p>
            <p>Message: {props.content}</p>
        </div>
    );
};

// Each mail
var MailContainer = function(props) {
    console.log('here we are');
    var mail = MAILBOX[props.params.mailbox_name][props.params.mailId];
        return (
            <EachMail id={mail.id} from={mail.from} to={mail.to} title={mail.title} content={mail.content} />
        );
}

var Mail = function(props) {
    var url = '/' + props.folderName + '/' + props.id;

    return (
        <div>
            <p>From: {props.from}</p>
            <p>To: {props.to}</p>
            <p>
                <strong>
                    <Link to={url} component>Subject: {props.title}</Link>
                </strong>
            </p>
        </div>

    );
};

var MailList = function(props) {
    if (props.mailList === undefined) {
        throw new Error('No directory found');
    }
   var mails = Object.keys(props.mailList).map(function(mailId,index) {
       var mail = props.mailList[mailId];
       return (
            <li key={index}>
                <Mail folderName={props.folderName} id={mail.id} from={mail.from} to={mail.to} title={mail.title} content={mail.content} />
            </li>
        );
   });
   return (
        <ul id="mail-view">
            {mails}
        </ul>
    );
};

var MailboxContainer = function(props) {
    var mailbox = MAILBOX[props.params.mailbox_name];
    return <MailList mailList={mailbox} folderName={props.params.mailbox_name} />
}

var App = function(props) {
    return (
        <div>
            <header>
                <h1>My Mailbox</h1>
            </header>
                {props.children}
                <Navbar />
        </div>
    );
};

var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Navbar} />
            <Route path=":mailbox_name" component={MailboxContainer} />
            <Route path=":mailbox_name/:mailId" component={MailContainer} />
        </Route>
    </Router>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});