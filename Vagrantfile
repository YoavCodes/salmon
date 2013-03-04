Vagrant::Config.run do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  config.vm.network :hostonly, "200.200.200.200"

  config.vm.share_folder("highfin-data", "/srv/www/highfin.js/", ".", :nfs => true)

  config.vm.provision :shell, :path => "./conf/dev/vagrant_setup.sh"
end
