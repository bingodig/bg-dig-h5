import React from 'react';
import Notification from 'rc-notification';
import FontIcon from './font-icon';

let defaultDuration = 1.5;
let defaultTop;
let messageInstance;
let key = 1;

function getMessageInstance() {
    messageInstance = messageInstance || Notification.newInstance({
            prefixCls: 'dig-message',
            transitionName: 'move-up',
            style: { defaultTop } // 覆盖原来的样式
        });
    return messageInstance;
}

function notice(content, type, onClose, duration = defaultDuration) {
    let iconClass = ({
        info: 'dig-message-info',
        success: 'dig-message-success',
        error: 'dig-message-error',
        warn: 'dig-message-warn',
        loading: 'dig-message-loading'
    })[type];

    let iconType = ({
        info: 'bingo-dig-icons-58',
        success: 'bingo-dig-icons-29',
        error: 'bingo-dig-icons-675',
        warn: 'bingo-dig-icons-163',
        loading: 'bingo-dig-icons-174'
    })[type];

    let instance = getMessageInstance();
    instance.notice({
        key,
        duration,
        style: {},
        content: <div className={`dig-message-custom-content ${iconClass}`}>
            <FontIcon className={`${iconClass} ${iconType}`} />
            <span>{content}</span>
        </div>,
        onClose
    });
    return (function () {
        let target = key++;
        return function () {
            instance.removeNotice(target);
        };
    }());
}

module.exports = {
    info(content, duration, onClose) {
        return notice(content, 'info', onClose, duration);
    },
    success(content, duration, onClose) {
        return notice(content, 'success', onClose, duration);
    },
    error(content, duration, onClose) {
        return notice(content, 'error', onClose, duration);
    },
    warn(content, duration, onClose) {
        return notice(content, 'warn', onClose, duration);
    },
    loading(content, duration, onClose) {
        return notice(content, 'loading', onClose, duration);
    },
    config(options) {
        if ('top' in options) {
            defaultTop = options.top;
        }
        if ('duration' in options) {
            defaultDuration = options.duration;
        }
    },
    destroy() {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
    }
};
