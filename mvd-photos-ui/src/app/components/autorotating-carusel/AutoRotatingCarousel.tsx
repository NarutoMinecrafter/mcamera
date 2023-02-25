// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Slide} from 'components/autorotating-carusel';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import {grey} from '@material-ui/core/colors';
import withStyles from '@material-ui/core/styles/withStyles';
import {duration} from '@material-ui/core/styles/transitions';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Dots from 'material-ui-dots';
import classNames from 'classnames';
import Carousel from './SwipableCarouselView';
import {SourceName} from 'containers/devices/photos/constants';
import {modulo} from './util';

const styles = {
    root: {
        '& > *:focus': {
            outline: 'none'
        }
    },
    content: {
        width: '60%',
        maxWidth: 800,
        height: 'calc(100% - 96px)',
        maxHeight: 700,
        margin: '-16px auto 0',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    contentMobile: {
        width: '100%',
        height: '100%',
        maxWidth: 'initial',
        maxHeight: 'initial',
        margin: 0,
        top: 0,
        transform: 'none',

        '& > $carouselWrapper': {
            borderRadius: 0
        }
    },
    arrow: {
        width: 48,
        height: 48,
        position: 'absolute',
        top: 'calc((100% - 96px) / 2 + 24px)'
    },
    arrowLeft: {
        left: -96
    },
    arrowRight: {
        right: -96
    },
    arrowIcon: {
        color: grey[700]
    },
    carouselWrapper: {
        overflow: 'hidden',
        borderRadius: 14,
        transform: 'scale(1.0)',
        background: 'transparent',
        height: '100%'
    },
    dots: {
        paddingTop: 10,
        margin: '0 auto'
    },
    dotsMobile: {
        paddingTop: 0
    },
    dotsMobileLandscape: {
        paddingTop: 20
    },
    footer: {
        marginTop: -55,
        width: '100%',
        position: 'relative',
        textAlign: 'center'
    },
    footerMobile: {
        marginTop: -92
    },
    footerMobileLandscape: {
        marginTop: -3,
        transform: 'translateY(-50vh)',
        display: 'inline-block',
        width: 'auto'
    },
    slide: {
        width: '100%',
        height: '100%'
    },
    slideMobile: {
        width: '100%',
        height: '100%'
    },
    carousel: {
        height: '100%'
    },
    carouselContainer: {
        height: '100%'
    },
    closed: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1500,
        color: '#fff'
    },
    mr: {
        marginRight: 10
    }
};

const PhotosTime: React.FC<{photo: Photo; variant: Variant;}> = ({photo, variant}) => (
    <Box display="flex" justifyContent="center">
        <Tooltip title={SourceName[photo.source]} placement="left">
            <Typography variant={variant} style={{marginRight: 2}}>
                {photo.source}
            </Typography>
        </Tooltip>
        <Typography variant={variant}>
            {new Date(+photo.originaltime).toLocaleString('uk-UK')}
        </Typography>
    </Box>
);


class AutoRotatingCarousel extends Component {
    componentDidUpdate(prevProps: Readonly, prevState: Readonly<{}>, snapshot) {
        if (prevProps.startIndex !== this.props.startIndex) {
            this.handleChange(this.props.startIndex);
        }
    }

    state = {
        slideIndex: this.props.startIndex || 0
    };

    handleContentClick = (e) => e.stopPropagation() || e.preventDefault();

    handleChange = (slideIndex: number) => {
        this.setState({
            slideIndex
        }, this.onChange(slideIndex));
    };

    decreaseIndex = () => {
        const slideIndex = modulo(this.state.slideIndex - 1, this.props.photos.length);
        this.setState({
            slideIndex
        }, this.onChange(slideIndex));
    }

    increaseIndex() {
        const slideIndex = modulo(this.state.slideIndex + 1, this.props.photos.length);
        this.setState({
            slideIndex
        }, this.onChange(slideIndex));
    }

    onChange(slideIndex: number): undefined {
        if (this.props.onChange) {
            this.props.onChange(modulo(slideIndex, this.props.photos.length));
        }
        return undefined;
    }

    render() {
        const {
            autoplay,
            children,
            classes,
            containerStyle,
            hideArrows,
            interval,
            landscape: landscapeProp,
            mobile,
            ModalProps,
            open,
            onClose,
            onStart,
            onSecondaryAction,
            onAdditionalAction,
            photos,
            path,
            idSelectPhoto
        } = this.props;
        const landscape = mobile && landscapeProp;
        const transitionDuration = {enter: duration.enteringScreen, exit: duration.leavingScreen};
        const hasMultipleChildren = photos.length != null;

        const carousel = (
            <Carousel
                autoplay={open && autoplay && hasMultipleChildren}
                className={classes.carousel}
                containerStyle={{height: '100%', ...containerStyle}}
                index={this.state.slideIndex}
                interval={interval}
                onChangeIndex={this.handleChange}
                slideClassName={classes.slide}
            >
                {
                    React.Children.map(children, c => React.cloneElement(c, {
                        mobile,
                        landscape
                    }))
                }
            </Carousel>
        );

        return (
            <Modal
                className={classNames(classes.root, {
                    [classes.rootMobile]: mobile
                })}
                open={open}
                onClose={onClose}
                BackdropComponent={Backdrop}
                BackdropProps={ModalProps ? {transitionDuration, ...ModalProps.BackdropProps} : {transitionDuration}}
                {...ModalProps}
            >
                <Fade
                    appear
                    in={open}
                    timeout={transitionDuration}
                >
                    <div
                        className={classNames(classes.content, {
                            [classes.contentMobile]: mobile
                        })}
                        onClick={this.handleContentClick}
                    >
                        <Paper
                            elevation={mobile ? 0 : 1}
                            className={classes.carouselWrapper}>
                            <IconButton onClick={onStart} className={classes.closed}>
                                <CloseIcon />
                            </IconButton>
                            {carousel}
                        </Paper>
                        <div style={landscape ? {
                            minWidth: 300,
                            maxWidth: 'calc(50% - 48px)',
                            padding: 24,
                            float: 'right'
                        } : null}>
                            <div
                                className={classNames(classes.footer, {
                                    [classes.footerMobile]: mobile,
                                    [classes.footerMobileLandscape]: landscape
                                })}
                            >
                                <IconButton onClick={() => onSecondaryAction(this.state.slideIndex)}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                                <IconButton onClick={() => onAdditionalAction(this.state.slideIndex)}>
                                    <DownloadIcon color="primary" />
                                </IconButton>
                                {
                                    hasMultipleChildren &&
                                    <Dots
                                        count={photos.length}
                                        index={modulo(this.state.slideIndex, photos.length)}
                                        className={classNames(classes.dots, {
                                            [classes.dotsMobile]: mobile,
                                            [classes.dotsMobileLandscape]: landscape
                                        })}
                                        onDotClick={this.handleChange}
                                    />
                                }
                            </div>
                        </div>
                        {!mobile && !hideArrows && hasMultipleChildren && (
                            <div>
                                <Fab
                                    className={classNames(classes.arrow, classes.arrowLeft)}
                                    onClick={() => this.decreaseIndex()}
                                >
                                    <ArrowBackIcon className={classes.arrowIcon}/>
                                </Fab>
                                <Fab
                                    className={classNames(classes.arrow, classes.arrowRight)}
                                    onClick={() => this.increaseIndex()}
                                >
                                    <ArrowForwardIcon className={classes.arrowIcon}/>
                                </Fab>
                            </div>
                        )}
                    </div>
                </Fade>
            </Modal>
        );
    }
}

AutoRotatingCarousel.defaultProps = {
    autoplay: true,
    interval: 3000,
    mobile: false,
    open: false,
    hideArrows: false
};

AutoRotatingCarousel.propTypes = {
    /** If `false`, the auto play behavior is disabled. */
    autoplay: PropTypes.bool,
    /** Properties applied to the [Button](https://material-ui.com/api/button/) element. */
    ButtonProps: PropTypes.object,
    /** Object for customizing the CSS classes. */
    classes: PropTypes.object.isRequired,
    /** Override the inline-styles of the carousel container. */
    containerStyle: PropTypes.object,
    /** Delay between auto play transitions (in ms). */
    interval: PropTypes.number,
    /** Button text. If not supplied, the button will be hidden. */
    label: PropTypes.string,
    /** If `true`, slide will adjust content for wide mobile screens. */
    landscape: PropTypes.bool,
    /** If `true`, the screen width and height is filled. */
    mobile: PropTypes.bool,
    /** Properties applied to the [Modal](https://material-ui.com/api/modal/) element. */
    ModalProps: PropTypes.object,
    /** Fired when the index changed. Returns current index. */
    onChange: PropTypes.func,
    /** Fired when the gray background of the popup is pressed when it is open. */
    onClose: PropTypes.func,
    /** Fired when the user clicks the getting started button. */
    onStart: PropTypes.func,
    onSecondaryAction: PropTypes.func,
    onAdditionalAction: PropTypes.func,
    /** Controls whether the AutoRotatingCarousel is opened or not. */
    open: PropTypes.bool,
    /** If `true`, the left and right arrows are hidden in the desktop version. */
    hideArrows: PropTypes.bool,
    startIndex: PropTypes.number
};

export default withStyles(styles)(AutoRotatingCarousel);
