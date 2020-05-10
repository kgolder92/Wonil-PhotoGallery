import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';

import App from '../client/components/App';
import Photo from '../client/components/Photo';
import Gallery from '../client/components/Gallery';
import { photos } from './mock';

describe('<App />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render the app component', () => {
    expect(wrapper).toExist();
  });

  // Before componentDidMount
  it('should render one <div class="gallery" /> element before componentDidMount', () => {
    expect(wrapper.find('.gallery')).toHaveLength(1);
  });

  // When !galleryView
  it('should render five <Photo /> elements on componentDidMount', () => {
    wrapper.setState({
      photos: [{}, {}, {}, {}, {}],
      galleryView: false,
    });
    expect(wrapper.find(Photo)).toHaveLength(5);
  });

  // When !galleryView
  it('should render five <Photo /> elements on componentDidMount when there are more than five photo objects', () => {
    wrapper.setState({
      photos,
      galleryView: false,

    });
    expect(wrapper.find(Photo)).toHaveLength(5);
  });

  // When galleryView
  it('should render one <Gallery /> element on componentDidMount', () => {
    wrapper.setState({
      photos,
      galleryView: true,
    });
    expect(wrapper.find(Gallery)).toHaveLength(1);
  });

  // When a photo is clicked
  it('should return galleryView: true when a photo is clicked', () => {
    wrapper = mount(<App />);
    wrapper.setState({
      photos,
      galleryView: false,
      index: 0,
    });
    expect(wrapper.state('galleryView')).toBe(false);
    expect(wrapper.state('index')).toBe(0);
    wrapper.find('div.photo-3').simulate('click');
    expect(wrapper.state('galleryView')).toBe(true);
    expect(wrapper.state('index')).toBe(3);
  });

  it('should return the index of the clicked photo when a photo is clicked', () => {
    wrapper = mount(<App />);
    wrapper.setState({
      photos,
      galleryView: false,
      index: 0,
    });
    wrapper.find('div.photo-1').simulate('click');
    expect(wrapper.state('galleryView')).toBe(true);
    expect(wrapper.state('index')).toBe(1);
  });

  // When 'Show all photos' is clicked
  it('should return index: 0 when "Show all photos" button is clicked', () => {
    wrapper.setState({
      photos,
      galleryView: false,
      index: 2,
    });
    expect(wrapper.state('galleryView')).toBe(false);
    expect(wrapper.state('index')).toBe(2);
    wrapper.find('#all-photos').simulate('click');
    expect(wrapper.state('galleryView')).toBe(true);
    expect(wrapper.state('index')).toBe(0);
  });

  // When 'Like' is clicked
  it('should toggle liked state when "Like" button is clicked', () => {
    wrapper.setState({
      photos,
      galleryView: false,
      liked: false,
    });
    expect(wrapper.state('liked')).toBe(false);
    wrapper.find('#like-btn').simulate('click');
    expect(wrapper.state('liked')).toBe(true);
    wrapper.find('#like-btn').simulate('click');
    expect(wrapper.state('liked')).toBe(false);
  });
});

describe('<Gallery />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('should hide "left" button when the first photo is displayed', () => {
    wrapper.setState({
      photos,
      galleryView: true,
      index: 0,
    });
    expect(wrapper.find('#left')).toHaveLength(0);
    expect(wrapper.find('#right')).toHaveLength(1);
  });

  it('should hide "right" button when the last photo is displayed', () => {
    wrapper.setState({
      photos: [{}, {}, {}, {}, {}],
      galleryView: true,
      index: 4,
    });
    expect(wrapper.find('#left')).toHaveLength(1);
    expect(wrapper.find('#right')).toHaveLength(0);
  });

  it('should display both "left" and "right" buttons when photo is displayed', () => {
    wrapper.setState({
      photos,
      galleryView: true,
      index: 4,
    });
    expect(wrapper.find('#left')).toHaveLength(1);
    expect(wrapper.find('#right')).toHaveLength(1);
  });

  it('should return to listing view when "close" button is clicked', () => {
    wrapper.setState({
      photos,
      galleryView: true,
      index: 0,
    });
    wrapper.find('#close').simulate('click');
    expect(wrapper.state('galleryView')).toBe(false);
  });

  it('should increase index when "right" button is clicked', () => {
    wrapper.setState({
      photos,
      galleryView: true,
      index: 2,
    });
    wrapper.find('#right').simulate('click');
    expect(wrapper.state('index')).toBe(3);
  });

  it('should decrease index when "left" button is clicked', () => {
    wrapper.setState({
      photos,
      galleryView: true,
      index: 3,
    });
    wrapper.find('#left').simulate('click');
    expect(wrapper.state('index')).toBe(2);
  });

  it('should toggle liked state when "Like" button is clicked in the gallery view', () => {
    wrapper.setState({
      photos,
      galleryView: true,
      liked: false,
    });
    wrapper.find('.view-liked').simulate('click');
    expect(wrapper.state('liked')).toBe(true);
    wrapper.find('.view-liked').simulate('click');
    expect(wrapper.state('liked')).toBe(false);
  });
});
